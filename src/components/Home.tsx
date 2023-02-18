import { Link } from "react-router-dom";
import backgroundImage from "../images/home_background.jpg";

export default function Home() {
  return (
    <>
      <img
        src={backgroundImage}
        alt=""
        className="fixed flex h-screen w-screen items-center justify-center object-cover brightness-[.4]"
      />
      <div className="z-10 flex w-full max-w-[90vw] flex-col items-center gap-8 text-center text-neutral-300">
        <h1 className="text-6xl font-light">Shopping Cart</h1>
        <Link
          to="/shop"
          className="w-full max-w-xs rounded-lg bg-neutral-700 px-4 py-4 text-2xl shadow-lg shadow-neutral-900 transition hover:bg-neutral-600 active:bg-neutral-900"
        >
          Shop now
        </Link>
      </div>
      <div className="fixed inset-x-0 bottom-0 py-2 px-4 text-center text-neutral-400">
        Background image by{" "}
        <a
          href="https://unsplash.com/photos/wvbOWcIDuYg"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          hosein zanbori at Unsplash
        </a>
      </div>
    </>
  );
}
