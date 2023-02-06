import Item from "../types";

interface ItemsListProps {
  items: Item[];
}

export default function ItemsList({ items }: ItemsListProps) {
  return (
    <div role="list" className="grid w-full grid-cols-1 gap-8">
      {items.map((item) => (
        <div className="flex w-full flex-col gap-2">
          <div className="aspect-square w-full rounded-lg border border-neutral-900 bg-neutral-700 shadow-lg shadow-neutral-900" />
          <div className="text-center">{item.name}</div>
        </div>
      ))}
    </div>
  );
}
