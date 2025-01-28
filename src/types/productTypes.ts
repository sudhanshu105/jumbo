export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    description?: string;
    category?: string;
    image_url?: string;
    tag: string;
  }