import { fireEvent, render } from "@testing-library/react";
import AddModal from "./AddModal";
import * as api from "../../api/listApi";

test("can add field data and submit calls api", () => {
  const mockAdd = jest.spyOn(api, "addItem");

  const component = render(
    <AddModal isOpen={true} setIsOpen={(boolean) => null} />
  );

  // Enter item field data
  const nameField = component
    .getByTestId("name-field")
    .querySelector("input") as HTMLInputElement;
  expect(nameField).toBeInTheDocument();
  fireEvent.change(nameField, {
    target: { value: "Potato Chips" },
  });
  expect(nameField.value).toBe("Potato Chips");

  const quantityField = component
    .getByTestId("quantity-field")
    .querySelector("input") as HTMLInputElement;
  expect(quantityField).toBeInTheDocument();
  fireEvent.change(quantityField, {
    target: { value: "4" },
  });
  expect(quantityField.value).toBe("4");

  // Click add and check that api was called
  const submitButton = component.getByTestId("add-modal-submit");
  submitButton.click();

  expect(mockAdd).toBeCalled();
});

test("incorrect field data triggers error", () => {
  const component = render(
    <AddModal isOpen={true} setIsOpen={(boolean) => null} />
  );

  // Click add without entering any data
  const submitButton = component.getByTestId("add-modal-submit");
  submitButton.click();

  expect(component.getByText("Please fill out the name.")).toBeInTheDocument();
  expect(
    component.getByText("Please fill out the quantity.")
  ).toBeInTheDocument();
});
