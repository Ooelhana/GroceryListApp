import { fireEvent, render } from "@testing-library/react";
import { GroceryItem } from "../../interfaces/groceryitems";
import EditModal from "./EditModal";
import * as api from "../../api/listApi";

const selectedItem: GroceryItem = {
  id: 1,
  name: "Banana",
  quantity: 1,
  is_purchased: false,
};

test("prefills fields with item data", () => {
  const component = render(
    <EditModal
      isOpen={true}
      setIsOpen={(arg0: boolean) => null}
      selectedItem={selectedItem}
    />
  );

  // Get fields and check values
  const nameField = component
    .getByTestId("name-field")
    .querySelector("input") as HTMLInputElement;
  expect(nameField.value).toEqual("Banana");

  const quantityField = component
    .getByTestId("quantity-field")
    .querySelector("input") as HTMLInputElement;
  expect(quantityField.value).toEqual("1");
});

test("edit field data and submit calls edit api", () => {
  const mockEdit = jest.spyOn(api, "editItem");

  const component = render(
    <EditModal
      isOpen={true}
      setIsOpen={(boolean) => null}
      selectedItem={selectedItem}
    />
  );

  // Enter item field data
  const nameField = component
    .getByTestId("name-field")
    .querySelector("input") as HTMLInputElement;
  expect(nameField).toBeInTheDocument();
  fireEvent.change(nameField, {
    target: { value: "Banana Bread" },
  });
  expect(nameField.value).toBe("Banana Bread");

  // Click add and check that api was called
  const submitButton = component.getByTestId("edit-modal-submit");
  submitButton.click();

  expect(mockEdit).toBeCalled();
});
