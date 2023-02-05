import { Link } from "react-router-dom";

export default function Shop() {
  return (
    <div className="flex flex-col gap-4 text-center text-neutral-300">
      <h1>Shop Page</h1>
      <Link to="/" className="bg-neutral-700 px-4 py-2">
        Return home
      </Link>
    </div>
  );
}
