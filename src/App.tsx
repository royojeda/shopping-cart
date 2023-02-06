import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Shop from "./components/Shop";
import inventory from "./inventory.json";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <div className="flex flex-1 items-center justify-center bg-neutral-800 p-4 text-neutral-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop allItems={inventory.items} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
