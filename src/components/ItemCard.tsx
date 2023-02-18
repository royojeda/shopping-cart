import { useState } from "react";
import { Item } from "../types";

interface ItemCardProps {
  item: Item;
  onAddToCart: ({
    itemId,
    quantity,
  }: {
    itemId: number;
    quantity: number;
  }) => void;
}

export default function ItemCard({ item, onAddToCart }: ItemCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuantity(Number(event.currentTarget.value));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    onAddToCart({ itemId: item.id, quantity });
  };

  const imageFor = (shopItem: Item) => {
    let image = "";
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      image = require(`../images/${shopItem.imageName}.png`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return image;
  };

  return (
    <div
      role="listitem"
      className="flex w-full max-w-[16rem] flex-col overflow-hidden rounded-lg bg-neutral-700 shadow-lg shadow-neutral-900"
    >
      <div className="flex w-full justify-center bg-white">
        <img src={imageFor(item)} alt={item.name} className="h-52" />
      </div>
      <div className="flex h-full flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-4 text-lg leading-none">
            <h1 className="break-words">{item.name}</h1>
            <h2>
              $
              {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h2>
          </div>
          {/* <h3 className="break-words text-sm font-light leading-none text-neutral-300">
            {item.description}
          </h3> */}
        </div>
        <form onSubmit={handleSubmit} className="flex justify-between gap-2">
          <div className="flex overflow-hidden rounded-lg border border-neutral-800">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 transition hover:bg-neutral-600 active:bg-neutral-800"
            >
              -
            </button>
            <div>
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                id="quantity"
                min="1"
                onChange={handleChange}
                className="h-full w-8 bg-neutral-800 text-center"
              />
            </div>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 transition hover:bg-neutral-600 active:bg-neutral-800"
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="rounded-lg border border-transparent bg-neutral-800 px-3 py-2 transition hover:border-neutral-900 hover:bg-neutral-700 hover:shadow hover:shadow-neutral-900 active:bg-neutral-900"
          >
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
}
