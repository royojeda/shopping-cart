import { CartItem } from "../types";

interface CartItemCardProps {
  item: CartItem;
  onRemoveFromCart: ({ itemId }: { itemId: number }) => void;
  onUpdateQuantity: ({
    itemId,
    change,
  }: {
    itemId: number;
    change: number;
  }) => void;
}

export default function CartItemCard({
  item,
  onRemoveFromCart,
  onUpdateQuantity,
}: CartItemCardProps) {
  const handleRemove = (itemId: number) => {
    setTimeout(() => {
      onRemoveFromCart({ itemId });
    }, 150);
  };

  const handleIncrement = (itemId: number) => {
    onUpdateQuantity({ itemId, change: 1 });
  };

  const handleDecrement = (targetItem: CartItem) => {
    if (targetItem.quantity === 1) {
      onRemoveFromCart({ itemId: targetItem.id });
    } else {
      onUpdateQuantity({ itemId: targetItem.id, change: -1 });
    }
  };

  return (
    <div
      key={item.id}
      role="listitem"
      className="grid grid-cols-2 gap-4 py-4 text-neutral-300"
    >
      <div className="aspect-square w-full rounded-lg bg-black shadow shadow-neutral-900" />
      <div className="flex w-full flex-col justify-center gap-4">
        <h2>{item.name}</h2>
        <h2 className="text-lg font-medium">${item.price}</h2>
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <div className="flex w-fit justify-self-end overflow-hidden rounded-lg border border-neutral-800">
          <button
            type="button"
            aria-label={`decrement-${item.id}`}
            onClick={() => {
              handleDecrement(item);
            }}
            className="w-8 transition hover:bg-neutral-600 active:bg-neutral-800"
          >
            -
          </button>
          <h3
            id="quantity"
            className="flex h-full w-8 select-none items-center justify-center bg-neutral-800 text-center"
          >
            {item.quantity}
          </h3>
          <button
            type="button"
            aria-label={`increment-${item.id}`}
            onClick={() => {
              handleIncrement(item.id);
            }}
            className="w-8 transition hover:bg-neutral-600 active:bg-neutral-800"
          >
            +
          </button>
        </div>
        <button
          type="button"
          aria-label={`delete-${item.id}`}
          onClick={() => {
            handleRemove(item.id);
          }}
          className="w-fit rounded-lg border border-transparent bg-neutral-800 px-3 py-2 transition hover:border-neutral-900 hover:bg-neutral-700 hover:shadow hover:shadow-neutral-900 active:bg-neutral-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
