export interface Item {
  id: number;
  name: string;
  price: number;
  imageName: string;
}

export interface CartItem extends Item {
  quantity: number;
}
