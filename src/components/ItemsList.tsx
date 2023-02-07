import Item from "../types";
import ItemCard from "./ItemCard";

interface ItemsListProps {
  items: Item[];
}

export default function ItemsList({ items }: ItemsListProps) {
  return (
    <div role="list" className="grid w-full grid-cols-1 gap-8">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
