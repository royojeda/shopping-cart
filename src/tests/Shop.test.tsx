import { render } from "@testing-library/react";
import Cart from "../components/Cart";
import ItemCard from "../components/ItemCard";
import Shop from "../components/Shop";

jest.mock("../components/ItemCard");

jest.mock("../components/Cart");

test("renders the correct ItemCards", () => {
  const items = [
    { id: 1, name: "Item 1", description: "This is an item.", price: 1 },
    { id: 2, name: "Item 2", description: "This is an item.", price: 2 },
    { id: 3, name: "Item 3", description: "This is an item.", price: 3 },
  ];

  render(<Shop allItems={items} />);

  expect(ItemCard).toHaveBeenCalledTimes(3);
  expect(ItemCard).toHaveBeenNthCalledWith(
    1,
    { item: items[0], onAddToCart: expect.anything() },
    {}
  );
  expect(ItemCard).toHaveBeenNthCalledWith(
    2,
    { item: items[1], onAddToCart: expect.anything() },
    {}
  );
  expect(ItemCard).toHaveBeenNthCalledWith(
    3,
    { item: items[2], onAddToCart: expect.anything() },
    {}
  );
});

test("renders Cart", () => {
  const items = [
    { id: 1, name: "Item 1", description: "This is an item.", price: 1 },
    { id: 2, name: "Item 2", description: "This is an item.", price: 2 },
    { id: 3, name: "Item 3", description: "This is an item.", price: 3 },
  ];

  render(<Shop allItems={items} />);

  expect(Cart).toHaveBeenCalledWith(
    {
      children: null,
      totalPrice: 0,
      itemCount: 0,
    },
    {}
  );
});
