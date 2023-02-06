import Item from "../types";

interface CartProps {
  items: Item[];
}

export default function Cart({ items }: CartProps) {
  return (
    <div className="w-full">
      <div>Cart: {items.length} items</div>
      {items.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}
