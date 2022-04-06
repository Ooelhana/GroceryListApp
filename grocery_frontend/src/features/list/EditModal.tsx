import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { addItem, editItem } from "../../api/listApi";
import { GroceryItem } from "../../interfaces/groceryitems";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  selectedItem: GroceryItem;
}

// Modal for adding a new item to the list
export default function AddModal({
  isOpen,
  setIsOpen,
  selectedItem,
}: EditModalProps) {
  //   Item data
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [nameError, setNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {
    setName(selectedItem.name);
    setQuantity(selectedItem.quantity.toString());
    setNameError(false);
    setQuantityError(false);
  }, [isOpen]);

  //   Update name value
  function handleNameChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (nameError) setNameError(false);
    setName(e.target.value);
  }

  //   Handle quantity value
  function handleQuantityChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (quantityError) setQuantityError(false);
    if (e.target.value.includes(".")) {
      return;
    }
    const num = parseInt(e.target.value);
    if (e.target.value === "" || (!isNaN(num) && num >= 0)) {
      setQuantity(e.target.value);
    }
  }

  // Close the modal
  function handleClose() {
    setIsOpen(false);
  }

  // Submit the new item
  function handleSubmit() {
    if (!name) {
      setNameError(true);
      return;
    }
    if (!quantity) {
      setQuantityError(true);
      return;
    }

    const groceryItem: GroceryItem = {
      id: 1,
      name: name,
      quantity: parseInt(quantity),
      is_purchased: selectedItem.is_purchased,
    };
    editItem(groceryItem);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the item details and click "Edit" to save the changes.
        </DialogContentText>
        <TextField
          autoFocus
          error={nameError}
          helperText={nameError ? "Please fill out the name." : ""}
          margin="dense"
          id="name"
          inputProps={{
            "data-testid": "name-field",
          }}
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => handleNameChange(e)}
        />
        <TextField
          autoFocus
          error={quantityError}
          helperText={quantityError ? "Please fill out the quantity." : ""}
          margin="dense"
          id="quantity"
          inputProps={{
            "data-testid": "quantity-field",
          }}
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={quantity}
          onChange={(e) => handleQuantityChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
