import Item from "../types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div key={item.id} role="listitem" className="flex w-full flex-col gap-2">
      <div className="aspect-square w-full rounded-lg border border-neutral-900 bg-neutral-700 shadow-lg shadow-neutral-900" />
      <div className="text-center">{item.name}</div>
    </div>
  );
}
