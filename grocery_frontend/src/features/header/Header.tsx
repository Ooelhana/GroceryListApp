import { Typography } from "@mui/material";
import "./Header.css";

// App title
export default function Header() {
  return (
    <Typography
      className="title"
      variant="h3"
      component="h3"
      data-testid="app-title"
    >
      Grocery List
    </Typography>
  );
}
