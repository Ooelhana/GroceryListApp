import { Button } from "@mui/material";
import { useState } from "react";
import "./AddItem.css";
import AddModal from "./AddModal";

// Component responsible for adding new items to the list
export default function AddItem() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Open the add item modal
  function handleAddItem() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="add-item-box">
        <Button
          variant="contained"
          color="primary"
          data-testid="add-item-btn"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </div>
      <AddModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
