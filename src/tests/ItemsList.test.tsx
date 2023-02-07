import { render } from "@testing-library/react";
import ItemCard from "../components/ItemCard";
import ItemsList from "../components/ItemsList";

jest.mock("../components/ItemCard");

test("renders ItemCards correctly", () => {
  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  render(<ItemsList items={items} />);

  expect(ItemCard).toHaveBeenCalledTimes(3);
  expect(ItemCard).toHaveBeenNthCalledWith(1, { item: items[0] }, {});
  expect(ItemCard).toHaveBeenNthCalledWith(2, { item: items[1] }, {});
  expect(ItemCard).toHaveBeenNthCalledWith(3, { item: items[2] }, {});
});
