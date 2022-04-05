import { render } from "@testing-library/react";
import AddItem from "./AddItem";

test("renders component button", () => {
  const { getByText } = render(<AddItem />);

  expect(getByText("Add Item")).toBeInTheDocument();
});

test("button opens modal", () => {
  const page = render(<AddItem />);
  const button = page.getByTestId("add-item-btn");
  button.click();

  expect(
    page.getByText(
      "To add a new grocery item, please enter the name and quantity of the item here."
    )
  ).toBeInTheDocument();
});
