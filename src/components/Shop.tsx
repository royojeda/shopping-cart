import { useState } from "react";
import uniqid from "uniqid";
import Item from "../types";
import Cart from "./Cart";
import ItemsList from "./ItemsList";

interface ShopProps {
  allItems: { name: string }[];
}

export default function Shop({ allItems }: ShopProps) {
  const uniqueItems: Item[] = allItems.map((item) => ({
    id: uniqid() as string,
    ...item,
  }));

  const [cartItems, setCartItems] = useState<Array<Item>>([]);

  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <Cart items={cartItems} />
      <ItemsList items={uniqueItems} />
    </div>
  );
}
