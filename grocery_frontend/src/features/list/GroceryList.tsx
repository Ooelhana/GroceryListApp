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
import { GroceryItem } from "../../interfaces/groceryitems";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import "./GroceryList.css";

interface GroceryListProps {
  groceryItems: GroceryItem[];
}

export default function GroceryList({ groceryItems }: GroceryListProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  // Handle check
  function handleCheck(id: number) {}

  // Open Edit Modal
  function handleEdit(id: number) {
    setSelectedItem(id);
    setIsEditOpen(true);
  }

  // Open Delete Modal
  function handleDelete(id: number) {
    setSelectedItem(id);
    setIsDeleteOpen(true);
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
                    <Checkbox checked={item.is_purchased} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(e) => handleEdit(item.id)}
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
      <EditModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        selectedItem={selectedItem}
      />
      <DeleteModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        selectedItem={selectedItem}
      />
    </>
  );
}
