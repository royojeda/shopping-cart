import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart";
import { CartItem } from "../types";

test("renders a button showing the correct number of items in the cart", () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 2,
      quantity: 2,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 3,
      quantity: 3,
    },
  ];
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = () => {};

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );

  const element = screen.queryByRole("button", { name: /3/ });
  expect(element).toBeInTheDocument();
});

test("shows an 'empty cart' message if there are no items in the cart", () => {
  const items: CartItem[] = [];
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = () => {};

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button"));

  const element = screen.queryByRole("heading", { name: /empty/i });
  expect(element).toBeInTheDocument();
});

test("displays the correct details for each item in the cart", () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 7,
      quantity: 93,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 8,
      quantity: 97,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 9,
      quantity: 99,
    },
  ];
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = () => {};

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button"));

  const itemNames = screen.queryAllByRole("heading", { name: /item [1-3]/i });
  expect(itemNames.length).toBe(3);

  const itemQuantities = screen.queryAllByRole("heading", { name: /93|97|99/ });
  expect(itemQuantities.length).toBe(3);

  const prices = screen.queryAllByRole("heading", { name: /\$/ });
  // Three items + one for the total price
  expect(prices.length).toBe(4);

  const totalPrice = screen.queryByRole("heading", { name: /2318/ });
  expect(totalPrice).toBeInTheDocument();
});

test("calls the delete callback with the appropriate item id", () => {
  jest.useFakeTimers();
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 7,
      quantity: 93,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 8,
      quantity: 97,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 9,
      quantity: 99,
    },
  ];
  const onRemoveFromCart = jest.fn();
  const onUpdateQuantity = () => {};

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  act(() => {
    userEvent.click(screen.getByRole("button"));
    jest.runAllTimers();
  });
  userEvent.click(screen.getByRole("button", { name: /delete-1/ }));
  jest.runAllTimers();

  expect(onRemoveFromCart).toHaveBeenCalledWith({ itemId: 1 });
});

test("calls the update quantity callback with +1 after clicking the increment button", () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 7,
      quantity: 93,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 8,
      quantity: 97,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 9,
      quantity: 99,
    },
  ];
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = jest.fn();

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByRole("button", { name: /increment-1/ }));

  expect(onUpdateQuantity).toHaveBeenCalledWith({ itemId: 1, change: 1 });
});

test("calls the update quantity callback with -1 after clicking the decrement button", () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 7,
      quantity: 93,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 8,
      quantity: 97,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 9,
      quantity: 99,
    },
  ];
  const onRemoveFromCart = () => {};
  const onUpdateQuantity = jest.fn();

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByRole("button", { name: /decrement-1/ }));

  expect(onUpdateQuantity).toHaveBeenCalledWith({ itemId: 1, change: -1 });
});

test("calls the delete callback after clicking the decrement button on an item where the item quantity is 1", () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description.",
      price: 7,
      quantity: 93,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description.",
      price: 8,
      quantity: 1,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Item 3 description.",
      price: 9,
      quantity: 99,
    },
  ];
  const onRemoveFromCart = jest.fn();
  const onUpdateQuantity = () => {};

  render(
    <Cart
      items={items}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByRole("button", { name: /decrement-2/ }));

  expect(onRemoveFromCart).toHaveBeenCalledWith({ itemId: 2 });
});
