import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-center text-neutral-300">
      <h1>Home Page</h1>
      <Link to="/shop" className="bg-neutral-700 px-4 py-2">
        Shop now
      </Link>
    </div>
  );
}
