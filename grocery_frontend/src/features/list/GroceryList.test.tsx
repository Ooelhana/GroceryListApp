import { render } from "@testing-library/react";
import { GroceryItem } from "../../interfaces/groceryitems";
import GroceryList from "./GroceryList";

test("renders table header", () => {
  const { getByText } = render(<GroceryList groceryItems={[]} />);

  expect(getByText("Name")).toBeInTheDocument();
});

test("renders list items", () => {
  const list: GroceryItem[] = [
    {
      id: 1,
      name: "Potato Chips",
      quantity: 3,
      is_purchased: false,
    },
    {
      id: 2,
      name: "Pumpkin Pie",
      quantity: 2,
      is_purchased: true,
    },
  ];
  const { getByText } = render(<GroceryList groceryItems={list} />);

  expect(getByText("Potato Chips")).toBeInTheDocument();
  expect(getByText("3")).toBeInTheDocument();

  expect(getByText("Pumpkin Pie")).toBeInTheDocument();
  expect(getByText("2")).toBeInTheDocument();
});
