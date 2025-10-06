import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import slugify from 'slugify';
import { ApiClient, Category, Product } from '../src/api';

type ImagePlan = {
  filePath: string;
  fileName: string;
  mimeType: string;
  checksum: string;
  position: number;
  alt: string;
};

type ProductPlan = {
  name: string;
  slug: string;
  categories: string[]; // path parts e.g. ['Skincare','Face','Brightening']
  images: ImagePlan[];
};

type RunReport = {
  dryRun: boolean;
  products: Array<{
    name: string;
    slug: string;
    productId: string | number | null;
    categoryPath: string;
    categoryIds: Array<string | number>;
    images: Array<{
      file: string;
      checksum: string;
      mediaId: string | number | null;
      position: number;
      alt: string;
    }>;
  }>;
};

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const INPUTS: Array<{ dir: string; product: string; categoryPath: string }> = [
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/kojic jpgs',
    product: 'Kojic Acid Whitening Cream',
    categoryPath: 'Skincare > Face > Brightening',
  },
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/methylene',
    product: 'Ultimate Methylene Blue 1%',
    categoryPath: 'Supplements > Cognitive Support',
  },
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/nad + jpgs',
    product: 'NAD+ Nicotinamide Riboside',
    categoryPath: 'Supplements > Cellular Energy',
  },
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/parasite/parasite jpgs',
    product: 'Parasite Cleanser (Liquid Herbal Extract)',
    categoryPath: 'Supplements > Detox & Gut Health',
  },
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/listings/retinol listing images',
    product: 'Retinol + Collagen Cream',
    categoryPath: 'Skincare > Face > Anti-Aging',
  },
  {
    dir: 'C:/Users/arqam/Downloads/NP/backend/Images/listings/matrixyl images',
    product: 'Matrixyl 3000 + Argireline Cream',
    categoryPath: 'Skincare > Face > Anti-Aging',
  },
];

function computeChecksum(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

function detectMimeType(file: string): string {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}

function sortScore(name: string): number {
  const lower = name.toLowerCase();
  if (/hero|front|bottle/.test(lower)) return 0;
  if (/infographic/.test(lower)) return 1;
  if (/lifestyle/.test(lower)) return 2;
  return 3;
}

function generateAlt(productName: string, index: number, fileName: string): string {
  const lower = fileName.toLowerCase();
  let type = 'Image';
  if (/hero|front|bottle/.test(lower)) type = 'Hero';
  else if (/infographic/.test(lower)) type = 'Infographic';
  else if (/lifestyle/.test(lower)) type = 'Lifestyle';
  const sequence = index + 1;
  return `${productName} – ${type} ${sequence}`;
}

async function loadMediaMap(file: string): Promise<Record<string, { id: string | number; url?: string }>> {
  try {
    const raw = await fs.promises.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveMediaMap(file: string, data: Record<string, { id: string | number; url?: string }>): Promise<void> {
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

async function ensureCategoryPath(api: ApiClient, pathParts: string[]): Promise<Array<string | number>> {
  const ids: Array<string | number> = [];
  let parentId: string | number | null | undefined = null;
  for (const part of pathParts) {
    const slug = slugify(part, { lower: true, strict: true });
    let cat = await api.getCategoryBySlug(slug);
    if (!cat) {
      cat = await api.createCategory(part, slug, parentId ?? null);
    }
    ids.push(cat.id);
    parentId = cat.id;
  }
  return ids;
}

async function ensureProduct(api: ApiClient, name: string): Promise<Product> {
  const slug = slugify(name, { lower: true, strict: true });
  const existing = await api.getProductBySlug(slug);
  if (existing) return existing;
  return await api.createProduct(name, slug);
}

async function planForDir(dir: string, product: string, categoryPath: string): Promise<ProductPlan> {
  const entries = await fs.promises.readdir(dir);
  const files = entries
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(dir, f));
  const sorted = files.sort((a, b) => {
    const an = path.basename(a);
    const bn = path.basename(b);
    const as = sortScore(an);
    const bs = sortScore(bn);
    if (as !== bs) return as - bs;
    return an.localeCompare(bn, undefined, { numeric: true, sensitivity: 'base' });
  });
  const images: ImagePlan[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const filePath = sorted[i];
    const fileName = path.basename(filePath);
    const checksum = await computeChecksum(filePath);
    images.push({
      filePath,
      fileName,
      checksum,
      mimeType: detectMimeType(fileName),
      position: i + 1,
      alt: generateAlt(product, i, fileName),
    });
  }
  return {
    name: product,
    slug: slugify(product, { lower: true, strict: true }),
    categories: categoryPath.split('>').map((s) => s.trim()),
    images,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;
  if (!baseUrl || !apiKey) {
    console.error('Missing BASE_URL or API_KEY in .env');
    process.exit(1);
  }
  const api = new ApiClient(baseUrl, apiKey);

  const mediaMapPath = path.resolve('media-map.json');
  const runReportPath = path.resolve('run-report.json');
  const mediaMap = await loadMediaMap(mediaMapPath);

  const plans: ProductPlan[] = [];
  for (const item of INPUTS) {
    if (!fs.existsSync(item.dir)) {
      console.warn(`Directory not found: ${item.dir}`);
      continue;
    }
    plans.push(await planForDir(item.dir, item.product, item.categoryPath));
  }

  const report: RunReport = { dryRun, products: [] };

  for (const plan of plans) {
    const categoryIds: Array<string | number> = [];
    let product: Product | null = null;

    if (!dryRun) {
      const ids = await ensureCategoryPath(api, plan.categories);
      categoryIds.push(...ids);
      product = await ensureProduct(api, plan.name);
      await api.setProductCategories(product.id, categoryIds);
    } else {
      // simulate ids as slugs in dry-run
      const ids = plan.categories.map((c) => slugify(c, { lower: true, strict: true }));
      categoryIds.push(...ids);
    }

    const productId = product?.id ?? null;

    const imagesReport: RunReport['products'][number]['images'] = [];

    for (const img of plan.images) {
      let mediaId: string | number | null = null;
      if (mediaMap[img.checksum]) {
        mediaId = mediaMap[img.checksum].id;
      } else if (!dryRun) {
        const uploaded = await api.uploadMedia(img.filePath, img.fileName, img.mimeType);
        mediaMap[img.checksum] = { id: uploaded.id, url: uploaded.url };
        mediaId = uploaded.id;
        await saveMediaMap(mediaMapPath, mediaMap);
      }

      if (!dryRun && productId && mediaId != null) {
        await api.addProductImage(productId, { mediaId, alt: img.alt, position: img.position });
      }

      imagesReport.push({
        file: img.filePath,
        checksum: img.checksum,
        mediaId: mediaId,
        position: img.position,
        alt: img.alt,
      });
    }

    report.products.push({
      name: plan.name,
      slug: plan.slug,
      productId,
      categoryPath: plan.categories.join(' > '),
      categoryIds,
      images: imagesReport,
    });
  }

  await fs.promises.writeFile(runReportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Run complete. Dry-run=${dryRun}. Report: ${runReportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


