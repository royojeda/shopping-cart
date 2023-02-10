import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard";

test("displays the item details", () => {
  const item = {
    id: 1,
    name: "Item 1",
    description: "Item 1 description.",
    price: 1,
  };
  const handleAddtoCart = () => {};

  render(<ItemCard item={item} onAddToCart={handleAddtoCart} />);

  const itemName = screen.queryByRole("heading", { level: 1, name: "Item 1" });
  expect(itemName).toBeInTheDocument();

  const itemPrice = screen.queryByRole("heading", { level: 2, name: "$1" });
  expect(itemPrice).toBeInTheDocument();

  const itemDescription = screen.queryByRole("heading", {
    level: 3,
    name: "Item 1 description.",
  });
  expect(itemDescription).toBeInTheDocument();
});
