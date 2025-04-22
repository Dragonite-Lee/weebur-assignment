export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  reviews: Review[];
  thumbnail: string;

  [key: string]: any;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductFilters = {
  q?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  limit?: number
};