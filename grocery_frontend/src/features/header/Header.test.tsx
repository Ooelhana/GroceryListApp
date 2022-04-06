import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "./Header";

test("renders grocery list header", () => {
  const { getByTestId } = render(<Header />);

  expect(getByTestId("app-title")).toBeInTheDocument();
});
