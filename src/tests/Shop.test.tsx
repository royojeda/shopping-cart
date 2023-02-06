import { render } from "@testing-library/react";
import ItemsList from "../components/ItemsList";
import Cart from "../components/Cart";
import Shop from "../components/Shop";

jest.mock("../components/ItemsList");

jest.mock("uniqid", () => () => "mockId");

jest.mock("../components/Cart");

test("renders ItemsList with the correct props", () => {
  const items = [
    { id: "mockId", name: "Item 1" },
    { id: "mockId", name: "Item 2" },
    { id: "mockId", name: "Item 3" },
  ];

  render(<Shop allItems={items} />);

  expect(ItemsList).toHaveBeenCalledWith({ items }, {});
});

test("renders Cart", () => {
  const items = [
    { id: "mockId", name: "Item 1" },
    { id: "mockId", name: "Item 2" },
    { id: "mockId", name: "Item 3" },
  ];

  render(<Shop allItems={items} />);

  expect(Cart).toHaveBeenCalledWith({ items: [] }, {});
});
