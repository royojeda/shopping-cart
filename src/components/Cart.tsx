import { useEffect, useState } from "react";

interface CartProps {
  children?: JSX.Element | null;
  totalPrice: number;
  itemCount: number;
}

export default function Cart({ children, totalPrice, itemCount }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openClass, setOpenClass] = useState("translate-x-full");
  const [openClass2, setOpenClass2] = useState(
    "backdrop-blur-none backdrop-brightness-100"
  );
  const [changeClass, setChangeClass] = useState("bg-neutral-700");

  useEffect(() => {
    if (!isOpen) {
      setChangeClass("duration-300 bg-neutral-500");
      setTimeout(() => {
        setChangeClass("duration-300 bg-neutral-700");
        setTimeout(() => {
          setChangeClass("bg-neutral-700");
        }, 300);
      }, 300);
    }
  }, [totalPrice]);

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
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`flex w-20 justify-center gap-2 rounded-lg px-3 py-2 shadow-md transition hover:bg-neutral-600 active:bg-neutral-900 ${changeClass}`}
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

        {itemCount}
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 flex min-h-screen justify-end transition duration-700 ${openClass2}`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 cursor-default"
          >
            {" "}
          </button>
          <div
            className={`flex h-full w-full max-w-lg flex-[3] flex-col gap-6 overflow-y-auto bg-neutral-800 p-8 outline outline-1 outline-neutral-900 transition duration-700 ${openClass}`}
          >
            <button
              type="button"
              onClick={handleClose}
              className="w-20 self-end rounded-lg bg-neutral-700 px-3 py-2 shadow-md transition hover:bg-neutral-600 active:bg-neutral-900"
            >
              X
            </button>
            <div className="flex flex-1 items-center">
              {itemCount ? (
                <div className="flex w-full flex-col gap-4 pb-[65px] min-[361px]:pb-[41px]">
                  <div className="grid auto-rows-fr grid-cols-1 divide-y divide-neutral-500 rounded-lg bg-neutral-700 px-4 shadow-md">
                    {children}
                  </div>
                  <h1 className="flex w-full flex-col rounded-lg bg-neutral-700 py-4 text-center text-xl font-medium drop-shadow-md min-[425px]:flex-row">
                    <div className="flex-1">Total: </div>
                    <div className="flex-1">
                      $
                      {totalPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </h1>
                  <button
                    type="button"
                    className="border1 w-full max-w-xs self-center rounded-lg border-neutral-900 bg-neutral-700 py-3 text-xl font-semibold shadow-md transition hover:bg-neutral-600 active:bg-neutral-900"
                  >
                    Check out
                  </button>
                </div>
              ) : (
                <h1 className="w-full text-center">
                  Your cart is currently empty.
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
