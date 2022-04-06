import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./features/header/Header";
import GroceryList from "./features/list/GroceryList";
import { GroceryItem } from "./interfaces/groceryitems";
import AddItem from "./features/add-item/AddItem";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { getItems } from "./api/listApi";

// Grocery list application
function App() {
  // Get items from db on app load
  useEffect(() => {
    getItems();
  }, []);

  const items = useAppSelector((state) => state.grocery.items);

  return (
    <div className="page">
      <Header />
      <GroceryList groceryItems={items} />
      <AddItem />
    </div>
  );
}

export default App;
