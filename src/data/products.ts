import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category?: string;
};

const OVERRIDES_KEY = "np_products_overrides";

const defaults: Product[] = [
  {
    id: "1",
    name: "Memory & Focus Booster",
    description: "Cognitive support formula to enhance focus and clarity",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewCount: 1024,
    image: product1,
    badge: "BEST SELLER",
    category: "focus",
  },
  {
    id: "2",
    name: "Beauty Glow Bundle",
    description: "Holistic skin & hair support with powerful antioxidants",
    price: 69.99,
    rating: 4.7,
    reviewCount: 876,
    image: product2,
    badge: "NEW",
    category: "beauty",
  },
  {
    id: "3",
    name: "Daily Essentials Stack",
    description: "Foundational wellness pack for energy, sleep, and calm",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 1622,
    image: product3,
    badge: "TRENDING",
    category: "bestsellers",
  },
];

function loadOverrides(): Product[] {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveOverrides(list: Product[]) {
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(list));
}

export function getProducts(): Product[] {
  const overrides = loadOverrides();
  const map = new Map<string, Product>();
  [...defaults, ...overrides].forEach(p => map.set(p.id, p));
  return Array.from(map.values());
}
export function upsertProduct(p: Product) {
  const overrides = loadOverrides();
  const idx = overrides.findIndex(x => x.id === p.id);
  if (idx >= 0) overrides[idx] = p;
  else overrides.push(p);
  saveOverrides(overrides);
}
export function deleteProduct(id: string) {
  const overrides = loadOverrides().filter(p => p.id !== id);
  saveOverrides(overrides);
}
export const products = getProducts();
