import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import AddModal from "./AddModal";

test("can add field data", () => {
  const component = render(
    <AddModal isOpen={true} setIsOpen={(boolean) => null} />
  );

  const nameField = component.getByTestId("name-field");
  const quantityField = component.getByTestId("quantity-field");

  //   fireEvent.change(nameField, { target: { value: "test" } });
  //   expect(component.getByText("test")).toBeInTheDocument();
});
