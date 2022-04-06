import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders grocery list page", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText("Grocery List")).toBeInTheDocument();
});

test("Adding an item will add it to the grocery list", () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Click add item button
  const addButton = app.getByTestId("add-item-btn");
  addButton.click();
  expect(
    app.getByText(
      "To add a new grocery item, please enter the name and quantity of the item here."
    )
  ).toBeInTheDocument();

  // Enter item details and click add
  // const nameField = app
  //   .getByTestId("name-field")
  //   .querySelector("input") as HTMLInputElement;
  // expect(nameField).toBeInTheDocument();
  // const quantityField = app
  //   .getByTestId("quantity-field")
  //   .querySelector("input") as HTMLInputElement;
  // expect(quantityField).toBeInTheDocument();

  // fireEvent.change(nameField, {
  //   target: { value: "test item" },
  // });
  // expect(nameField.value).toBe("test item");

  // fireEvent.change(quantityField, {
  //   target: { value: "4" },
  // });
  // expect(quantityField.value).toBe("4");

  // const submitButton = app.getByTestId("add-modal-submit");
  // submitButton.click();

  // Check that list contains added item
});

test("Editing an item will edit it in the grocery list", () => {});

test("Setting an item puchased, will edit the grocery list", () => {});

test("Unsetting an item purchased will edit the grocery list", () => {});

test("Deleting an item will remove it from the grocery list", () => {});
