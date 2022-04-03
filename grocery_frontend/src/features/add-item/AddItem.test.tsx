import { render } from "@testing-library/react";
import AddItem from "./AddItem";

test("renders component button", () => {
  const { getByText } = render(<AddItem />);

  expect(getByText("Add Item")).toBeInTheDocument();
});
