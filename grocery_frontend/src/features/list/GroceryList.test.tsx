import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import * as api from "../../api/listApi";
import { store } from "../../app/store";
import { GroceryItem } from "../../interfaces/groceryitems";
import GroceryList from "./GroceryList";

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

test("renders table header", () => {
  const { getByText } = render(
    <Provider store={store}>
      <GroceryList groceryItems={[]} />
    </Provider>
  );

  expect(getByText("Name")).toBeInTheDocument();
});

test("renders list items", () => {
  const { getByText } = render(
    <Provider store={store}>
      <GroceryList groceryItems={list} />
    </Provider>
  );

  // Check that list items appear in the component
  expect(getByText("Potato Chips")).toBeInTheDocument();
  expect(getByText("3")).toBeInTheDocument();

  expect(getByText("Pumpkin Pie")).toBeInTheDocument();
  expect(getByText("2")).toBeInTheDocument();
});

test("checkbox button makes api call", () => {
  const mockCheck = jest.spyOn(api, "editItem");

  const app = render(
    <Provider store={store}>
      <GroceryList groceryItems={list} />
    </Provider>
  );

  // Click is purchased checkbox
  const checkbox = app
    .getByTestId("checkbox-1")
    .querySelector("input") as HTMLInputElement;
  checkbox.click();

  // Check that api is called
  expect(mockCheck).toBeCalled();
});

test("edit button opens edit modal", () => {
  const app = render(
    <Provider store={store}>
      <GroceryList groceryItems={list} />
    </Provider>
  );

  // Click edit button
  const editButton = app.getByTestId("edit-button-1");
  editButton.click();

  // Check that modal opens
  expect(app.getByTestId("edit-modal-title")).toBeInTheDocument();
});

test("delete button calls delete api", () => {
  const mockDelete = jest.spyOn(api, "deleteItem");

  const app = render(
    <Provider store={store}>
      <GroceryList groceryItems={list} />
    </Provider>
  );

  // Click delete button
  const deleteButton = app.getByTestId("delete-button-1");
  deleteButton.click();

  // Check that api function was called
  expect(mockDelete).toBeCalled();
  mockDelete.mockRestore();
});
