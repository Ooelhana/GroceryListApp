import { store } from "../app/store";
import { setItems } from "../features/list/grocerySlice";
import { GroceryItem } from "../interfaces/groceryitems";

const url = `http://localhost:8000/groceryitems/`;

// Get all items
export function getItems() {
  fetch(url).then((response) => {
    // Success response
    if (response.status === 200) {
      response.json().then((data) => {
        store.dispatch(setItems(data));
      });
    }
    // Error Response
    else {
    }
  });
}

// Add a new item
export function addItem(name: string, quantity: number) {
  const jsonBody = {
    name: name,
    quantity: quantity,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  }).then((response) => {
    // Success response
    if (response.status === 201) {
      getItems();
    }
    // Error response
    else {
    }
  });
}

// Edit item
export function editItem(groceryItem: GroceryItem) {
  const jsonBody = {
    name: groceryItem.name,
    quantity: groceryItem.quantity,
    is_purchased: groceryItem.is_purchased,
  };

  fetch(`${url}${groceryItem.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  }).then((response) => {
    // Success response
    if (response.status === 200) {
      getItems();
    }
    // Error response
    else {
    }
  });
}

// Delete item
export function deleteItem(id: number) {
  fetch(`${url}${id}/`, {
    method: "DELETE",
  }).then((response) => {
    // Success response
    if (response.status === 204) {
      getItems();
    }
    // Error Response
    else {
    }
  });
}
