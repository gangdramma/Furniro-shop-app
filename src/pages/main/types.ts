export namespace IMain {
  export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    images: Array<string>;
  }

  export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
}
