import { useState } from "react";
import { CartItem, Item } from "../types";
import Cart from "./Cart";
import ItemCard from "./ItemCard";

interface ShopProps {
  allItems: Item[];
}

export default function Shop({ allItems }: ShopProps) {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);

  return (
    <div className="flex w-full flex-col gap-8 p-4">
      <Cart items={cartItems} />
      <div role="list" className="grid w-full grid-cols-1 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
