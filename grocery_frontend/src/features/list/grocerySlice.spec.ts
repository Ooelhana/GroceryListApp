import { GroceryItem } from "../../interfaces/groceryitems";
import groceryReducer, { setItems } from "./grocerySlice";

describe("counter reducer", () => {
  it("should handle initial state", () => {
    expect(groceryReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  it("should set grocery items", () => {
    const items: GroceryItem[] = [
      {
        id: 1,
        name: "test item",
        quantity: 2,
        is_purchased: true,
      },
    ];

    const actual = groceryReducer(undefined, setItems(items));
    expect(actual.items).toEqual(items);
  });
});
