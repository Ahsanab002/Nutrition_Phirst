import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';

export interface Media {
  id: string | number;
  url: string;
  checksum: string;
}

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  parentId?: string | number | null;
}

export interface Product {
  id: string | number;
  name: string;
  slug: string;
}

export class ApiClient {
  private http: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.http = axios.create({
      baseURL: baseUrl.replace(/\/$/, ''),
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      // 60s timeout to handle large media uploads
      timeout: 60000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
  }

  async uploadMedia(filePath: string, fileName: string, mimeType: string): Promise<Media> {
    const form = new FormData();
    // Node 18+ has native fs.ReadStream in global fs
    const fs = await import('fs');
    form.append('file', fs.createReadStream(filePath), {
      filename: fileName,
      contentType: mimeType,
    });
    const res = await this.http.post('/media', form, {
      headers: form.getHeaders(),
    });
    return res.data as Media;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const res = await this.http.get('/products', { params: { slug } });
    const items = Array.isArray(res.data) ? res.data : res.data?.items;
    if (Array.isArray(items) && items.length > 0) return items[0] as Product;
    return null;
  }

  async createProduct(name: string, slug: string): Promise<Product> {
    const res = await this.http.post('/products', { name, slug });
    return res.data as Product;
  }

  async addProductImage(productId: string | number, payload: { mediaId: string | number; alt: string; position: number }): Promise<void> {
    await this.http.post(`/products/${productId}/images`, payload);
  }

  async setProductCategories(productId: string | number, categoryIds: Array<string | number>): Promise<void> {
    await this.http.patch(`/products/${productId}/categories`, { categoryIds });
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const res = await this.http.get('/categories', { params: { slug } });
    const items = Array.isArray(res.data) ? res.data : res.data?.items;
    if (Array.isArray(items) && items.length > 0) return items[0] as Category;
    return null;
  }

  async createCategory(name: string, slug: string, parentId?: string | number | null): Promise<Category> {
    const res = await this.http.post('/categories', { name, slug, parentId: parentId ?? null });
    return res.data as Category;
  }
}


