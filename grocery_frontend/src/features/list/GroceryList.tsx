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
import { GroceryItem } from "../../interfaces/groceryitems";
import "./GroceryList.css";

interface GroceryListProps {
  groceryItems: GroceryItem[];
}

export default function GroceryList({ groceryItems }: GroceryListProps) {
  return (
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
                  <Button variant="outlined" color="primary">
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
