import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

jest.mock("../components/Home", () => () => <h1>Home Page</h1>);

jest.mock("../components/Shop", () => () => <h1>Shop Page</h1>);

jest.mock("../components/NotFound", () => () => <h1>Not Found Page</h1>);

test("renders the home page when visiting root", () => {
  const route = "/";

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

  const element = screen.queryByRole("heading", { name: /home page/i });

  expect(element).toBeInTheDocument();
});

test("renders the shop page when visiting /shop", () => {
  const route = "/shop";

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

  const element = screen.queryByRole("heading", { name: /shop page/i });

  expect(element).toBeInTheDocument();
});

test("renders the not found page when vising undefined routes", () => {
  const route = "/some-undefined-route";

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

  const element = screen.queryByRole("heading", { name: /not found page/i });

  expect(element).toBeInTheDocument();
});
