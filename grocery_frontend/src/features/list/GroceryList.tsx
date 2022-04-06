import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { deleteItem, editItem } from "../../api/listApi";
import { useAppDispatch } from "../../app/hooks";
import { GroceryItem } from "../../interfaces/groceryitems";
import EditModal from "./EditModal";
import "./GroceryList.css";
import { setItems } from "./grocerySlice";

interface GroceryListProps {
  groceryItems: GroceryItem[];
}

export default function GroceryList({ groceryItems }: GroceryListProps) {
  const dispatch = useAppDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | undefined>(
    undefined
  );

  // Handle check
  function handleCheck(id: number) {
    let groceryItem: GroceryItem | undefined = undefined;

    // Update data locally so change appears instant
    const updatedItems = groceryItems.map((item) => {
      if (item.id === id) {
        groceryItem = {
          ...item,
          is_purchased: !item.is_purchased,
        };
        return groceryItem;
      } else {
        return item;
      }
    });
    dispatch(setItems(updatedItems));

    // Send API request
    if (groceryItem) {
      editItem(groceryItem);
    }
  }

  // Open Edit Modal
  function handleEdit(item: GroceryItem) {
    setSelectedItem(item);
    setIsEditOpen(true);
  }

  // Open Delete Modal
  function handleDelete(id: number) {
    deleteItem(id);
  }

  return (
    <>
      <div className="table-box">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Is Purchased</TableCell>
                <TableCell>Edit</TableCell>

                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groceryItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.quantity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={item.is_purchased}
                      onChange={(e) => handleCheck(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(e) => handleEdit(item)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedItem && (
        <EditModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
}
