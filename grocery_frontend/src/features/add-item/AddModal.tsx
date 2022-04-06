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
import { addItem } from "../../api/listApi";

interface AddModalProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

// Modal for adding a new item to the list
export default function AddModal({ isOpen, setIsOpen }: AddModalProps) {
  //   Item data
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [nameError, setNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  // Form initialization
  useEffect(() => {
    setName("");
    setQuantity("");
    setNameError(false);
    setQuantityError(false);
  }, [isOpen]);

  //   Update name value
  function handleNameChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // Remove error message
    if (nameError) setNameError(false);

    setName(e.target.value);
  }

  //   Handle quantity value
  function handleQuantityChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // Remove error message
    if (quantityError) setQuantityError(false);

    // Only allow integers
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
    // Input validation
    if (!name) {
      setNameError(true);
    }
    if (!quantity) {
      setQuantityError(true);
    }
    if (name && quantity) {
      // Api post and modal close
      addItem(name, parseInt(quantity));
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle data-testid="add-modal-title">Add Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new grocery item, please enter the name and quantity of the
          item here.
        </DialogContentText>
        <TextField
          autoFocus
          error={nameError}
          helperText={nameError ? "Please fill out the name." : ""}
          margin="dense"
          id="name"
          data-testid="name-field"
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
          data-testid="quantity-field"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={quantity}
          onChange={(e) => handleQuantityChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button data-testid="add-modal-cancel" onClick={handleClose}>
          Cancel
        </Button>
        <Button data-testid="add-modal-submit" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
