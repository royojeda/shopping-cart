import { useState } from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onRemoveFromCart: ({ itemId }: { itemId: number }) => void;
}

export default function Cart({ items, onRemoveFromCart }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openClass, setOpenClass] = useState("translate-x-full");
  const [openClass2, setOpenClass2] = useState(
    "backdrop-blur-none backdrop-brightness-100"
  );

  const handleOpen = () => {
    document.body.classList.add("overflow-y-hidden");
    setIsOpen(true);
    setTimeout(() => {
      setOpenClass("translate-x-0");
      setOpenClass2("backdrop-blur backdrop-brightness-50");
    }, 1);
  };

  const handleClose = () => {
    setOpenClass("translate-x-full");
    setOpenClass2("backdrop-blur-none backdrop-brightness-100");
    setTimeout(() => {
      setIsOpen(false);
      document.body.classList.remove("overflow-y-hidden");
    }, 700);
  };

  const handleRemove = (itemId: number) => {
    setTimeout(() => {
      onRemoveFromCart({ itemId });
    }, 150);
  };

  return (
    <div className="flex w-full justify-end">
      <button
        type="button"
        onClick={handleOpen}
        className="flex w-20 justify-center gap-2 rounded-lg bg-neutral-700 px-3 py-2 shadow-md transition hover:bg-neutral-600 active:bg-neutral-900"
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
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        {items.length}
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 flex min-h-screen justify-end transition duration-700 ${openClass2}`}
        >
          <div
            className={`flex h-full w-full flex-col gap-6 overflow-y-scroll bg-neutral-800 p-8 outline outline-neutral-900 transition duration-700 ${openClass}`}
          >
            <button
              type="button"
              onClick={handleClose}
              className="w-20 self-end rounded-lg bg-neutral-700 px-3 py-2 shadow-md transition hover:bg-neutral-600 active:bg-neutral-900"
            >
              X
            </button>
            <div className="flex flex-1 flex-col justify-center">
              {items.length ? (
                <div className="flex flex-col divide-y divide-neutral-500 rounded-lg bg-neutral-700 px-4 shadow-lg">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      role="listitem"
                      className="flex flex-col gap-4 py-4 text-neutral-300"
                    >
                      <div className="flex gap-4">
                        <div className="h-20 w-full rounded-lg bg-black shadow shadow-neutral-900" />
                        <div className="flex w-full flex-col gap-4">
                          <h2 className="">{item.name}</h2>
                          <h2 className="text-lg font-medium">${item.price}</h2>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-1 justify-center">
                          <div className="flex overflow-hidden rounded-lg border border-neutral-800">
                            <button
                              type="button"
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
                                id="quantity"
                                min="1"
                                defaultValue={item.quantity}
                                className="h-full w-8 bg-neutral-800 text-center"
                              />
                            </div>
                            <button
                              type="button"
                              className="w-8 transition hover:bg-neutral-600 active:bg-neutral-800"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <button
                            type="button"
                            aria-label={`delete-${item.id}`}
                            onClick={() => {
                              handleRemove(item.id);
                            }}
                            className="rounded-lg border border-transparent bg-neutral-800 px-3 py-2 transition hover:border-neutral-900 hover:bg-neutral-700 hover:shadow hover:shadow-neutral-900 active:bg-neutral-900"
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
                    </div>
                  ))}
                  <h1 className="flex w-full py-4 text-center text-xl font-medium drop-shadow-md">
                    <div className="flex-1">Total: </div>
                    <div className="flex-1">
                      $
                      {items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </div>
                  </h1>
                </div>
              ) : (
                <h1 className="text-center">Your cart is currently empty.</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
