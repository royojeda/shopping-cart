import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard";

test("displays the item details", () => {
  const item = {
    id: 1,
    name: "Item 1",
    description: "Item 1 description.",
    price: 1,
    imageName: "black",
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

  const itemImage = screen.queryByAltText("Item 1");
  expect(itemImage).toHaveAttribute("src", "black.png");
});

test("displays a form for adding the item to the cart", () => {
  const item = {
    id: 1,
    name: "Item 1",
    description: "Item 1 description.",
    price: 1,
    imageName: "black",
  };
  const handleAddtoCart = () => {};

  render(<ItemCard item={item} onAddToCart={handleAddtoCart} />);

  const quantityInput = screen.queryByLabelText("Quantity");
  expect(quantityInput).toBeInTheDocument();

  const decrementButton = screen.queryByRole("button", { name: "-" });
  expect(decrementButton).toBeInTheDocument();

  const incrementButton = screen.queryByRole("button", { name: "+" });
  expect(incrementButton).toBeInTheDocument();

  const submitButton = screen.queryByRole("button", { name: /add to cart/i });
  expect(submitButton).toBeInTheDocument();
});
