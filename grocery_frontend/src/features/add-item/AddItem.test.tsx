import { render } from "@testing-library/react";
import AddItem from "./AddItem";

test("renders component button", () => {
  const component = render(<AddItem />);

  expect(component.getByTestId("add-item-btn")).toBeInTheDocument();
});

test("button opens modal", () => {
  const component = render(<AddItem />);
  const button = component.getByTestId("add-item-btn");
  button.click();

  expect(component.getByTestId("add-modal-title")).toBeInTheDocument();
});
