import { render, screen } from "@testing-library/react";
import { ItemsListProps } from "../components/ItemsList";
import Shop from "../components/Shop";

jest.mock("../components/ItemsList", () => ({ items }: ItemsListProps) => (
  <>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </>
));

test("renders the list of shop items correctly", () => {
  const items = [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }];

  render(<Shop allItems={items} />);

  const elements = screen.queryAllByRole("listitem");
  expect(elements.length).toBe(3);
  expect(elements[0].textContent).toBe("Item 1");
  expect(elements[1].textContent).toBe("Item 2");
  expect(elements[2].textContent).toBe("Item 3");
});
