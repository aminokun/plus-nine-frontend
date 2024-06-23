interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  unit_amount: number;
}

interface Product {
  id: string;
  object: string;
  active: boolean;
  created: number;
  default_price: Price;
  description: string;
  images: string[];
  livemode: boolean;
  name: string;
  updated: number;
}

interface ProductsResponse {
  object: string;
  data: Product[];
  has_more: boolean;
  url: string;
}
