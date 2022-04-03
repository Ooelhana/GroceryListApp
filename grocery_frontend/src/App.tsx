import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./features/header/Header";
import GroceryList from "./features/list/GroceryList";
import { GroceryItem } from "./interfaces/groceryitems";
import AddItem from "./features/add-item/AddItem";

function App() {
  const test: GroceryItem[] = [
    {
      id: 1,
      name: "Potato Chips",
      quantity: 3,
      is_purchased: false,
    },
    {
      id: 2,
      name: "Pumpkin Pie",
      quantity: 2,
      is_purchased: true,
    },
  ];
  return (
    <div className="page">
      <Header />
      <GroceryList groceryItems={test} />
      <AddItem />
    </div>
  );
}

export default App;
