export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CartItem extends Item {
  quantity: number;
}
