import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Shop from "./components/Shop";
import inventory from "./inventory.json";

export default function App() {
  const uniqueItems = inventory.items.map((item, index) => ({
    ...item,
    id: index,
  }));

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <div className="flex flex-1 items-center justify-center bg-neutral-800 p-4 text-neutral-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop allItems={uniqueItems} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
