import { useState } from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
}

export default function Cart({ items }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openClass, setOpenClass] = useState("translate-x-full");
  const [openClass2, setOpenClass2] = useState(
    "backdrop-blur-none backdrop-brightness-100"
  );

  const handleOpen = () => {
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
    }, 700);
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {items.length}
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 flex h-full w-full justify-end transition duration-700 ${openClass2}`}
        >
          <div
            className={`flex h-full w-full flex-col gap-4 bg-neutral-800 p-8 outline outline-neutral-900 transition duration-700 ${openClass}`}
          >
            <button
              type="button"
              onClick={handleClose}
              className="w-20 self-end rounded-md bg-neutral-700 px-3 py-2 shadow-md transition hover:bg-neutral-600 active:bg-neutral-900"
            >
              X
            </button>
            <div>
              {items.map((item) => (
                <div key={item.id}>
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
