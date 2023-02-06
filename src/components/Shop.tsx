import uniqid from "uniqid";
import Item from "../types";
import ItemsList from "./ItemsList";

interface ShopProps {
  allItems: { name: string }[];
}

export default function Shop({ allItems }: ShopProps) {
  const uniqueItems: Item[] = allItems.map((item) => ({
    id: uniqid() as string,
    ...item,
  }));

  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <ItemsList items={uniqueItems} />
    </div>
  );
}
