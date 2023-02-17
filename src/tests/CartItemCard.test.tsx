import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItemCard from "../components/CartItemCard";

jest.mock("../images/black.png");

test("displays the correct item details", () => {
  const item = {
    id: 1,
    name: "Item 11",
    description: "Item 1 description.",
    price: 7,
    imageName: "black",
    quantity: 93,
  };
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = () => {};

  render(
    <CartItemCard
      item={item}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );

  const itemName = screen.queryByRole("heading", { name: /^Item 11$/ });
  expect(itemName).toBeInTheDocument();

  const itemQuantity = screen.queryByRole("heading", { name: /93/ });
  expect(itemQuantity).toBeInTheDocument();

  const itemPrice = screen.queryByRole("heading", { name: /\$7/ });
  expect(itemPrice).toBeInTheDocument();

  const itemImage = screen.queryByAltText("Item 11");
  expect(itemImage).toHaveAttribute("src", "black.png");
});

test("calls the delete callback with the item id", () => {
  jest.useFakeTimers();
  const item = {
    id: 167,
    name: "Item 1",
    description: "Item 1 description.",
    price: 7,
    imageName: "black",
    quantity: 93,
  };
  const onRemoveFromCart = jest.fn();
  const onUpdateQuantity = () => {};

  render(
    <CartItemCard
      item={item}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button", { name: /^delete-167$/ }));
  jest.runAllTimers();

  expect(onRemoveFromCart).toHaveBeenCalledWith({ itemId: 167 });
});

test("calls the update quantity callback with +1 after clicking the increment button", () => {
  const item = {
    id: 78,
    name: "Item 1",
    description: "Item 1 description.",
    price: 7,
    imageName: "black",
    quantity: 93,
  };
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = jest.fn();

  render(
    <CartItemCard
      item={item}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button", { name: /^increment-78$/ }));

  expect(onUpdateQuantity).toHaveBeenCalledWith({ itemId: 78, change: 1 });
});

test("calls the update quantity callback with -1 after clicking the decrement button", () => {
  const item = {
    id: 92,
    name: "Item 1",
    description: "Item 1 description.",
    price: 7,
    imageName: "black",
    quantity: 93,
  };
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = jest.fn();

  render(
    <CartItemCard
      item={item}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button", { name: /^decrement-92$/ }));

  expect(onUpdateQuantity).toHaveBeenCalledWith({ itemId: 92, change: -1 });
});

test("calls the delete callback after clicking the decrement button if the quantity is 1", () => {
  const item = {
    id: 5,
    name: "Item 1",
    description: "Item 1 description.",
    price: 7,
    imageName: "black",
    quantity: 1,
  };
  const onRemoveFromCart = jest.fn();
  const onUpdateQuantity = () => {};

  render(
    <CartItemCard
      item={item}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button", { name: /^decrement-5$/ }));

  expect(onRemoveFromCart).toHaveBeenCalledWith({ itemId: 5 });
});
