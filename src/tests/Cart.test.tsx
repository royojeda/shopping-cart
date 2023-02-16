import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart";

test("displays 'open cart' button with number of items in cart", () => {
  const children = null;
  const totalPrice = 10;
  const itemCount = 3;

  render(
    <Cart totalPrice={totalPrice} itemCount={itemCount}>
      {children}
    </Cart>
  );

  const element = screen.queryByRole("button", { name: /3/ });
  expect(element).toBeInTheDocument();
});

test("displays an 'empty cart' message if there are no items in the cart", () => {
  jest.useFakeTimers();
  const children = null;
  const totalPrice = 0;
  const itemCount = 0;

  render(
    <Cart totalPrice={totalPrice} itemCount={itemCount}>
      {children}
    </Cart>
  );

  act(() => {
    userEvent.click(screen.getByRole("button"));
    jest.runAllTimers();
  });

  const element = screen.queryByRole("heading", { name: /empty/i });
  expect(element).toBeInTheDocument();
});

test("renders children", () => {
  jest.useFakeTimers();
  const children = <h1>Test element</h1>;
  const totalPrice = 0;
  const itemCount = 1;

  render(
    <Cart totalPrice={totalPrice} itemCount={itemCount}>
      {children}
    </Cart>
  );

  act(() => {
    userEvent.click(screen.getByRole("button"));
    jest.runAllTimers();
  });

  const element = screen.queryByRole("heading", { name: /Test element/ });
  expect(element).toBeInTheDocument();
});
