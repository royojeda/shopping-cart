import { useEffect } from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
}

export default function Cart({ items }: CartProps) {
  useEffect(() => {
    console.clear();
    console.table(items);
  });

  return (
    <div className="w-full">
      <div>
        Cart: {items.length} item{items.length === 1 ? "" : "s"}
      </div>
      {items.map((item) => (
        <div key={item.id}>
          {item.quantity}x {item.name}
        </div>
      ))}
    </div>
  );
}
