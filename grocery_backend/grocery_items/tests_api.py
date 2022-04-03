from rest_framework.test import APITestCase
from rest_framework import status
from .models import GroceryItem

grocery_url = "/groceryitems/"


class GroceryItemAPITestCase(APITestCase):
    def test_create_item(self):
        # Post new grocery item
        item_data = {
            "name": "Apple Pie",
            "quantity": 1,
        }
        response = self.client.post(grocery_url, item_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that it was saved in db
        item_count = GroceryItem.objects.filter(
            name="Apple Pie", quantity=1, is_purchased=False
        ).count()
        self.assertEqual(item_count, 1)

    def test_post_incorrect_format(self):
        # Post new grocery item with incorrect body
        item_data = {"quantity": 1, "other_field": "bad"}
        response = self.client.post(grocery_url, item_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_all_items(self):
        # Get from empty db and check
        response = self.client.get(grocery_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        # Add 2 items and check again
        GroceryItem.objects.create(name="Pumpkin Pie", quantity=3)
        GroceryItem.objects.create(name="Blueberry Pie", quantity=2)

        response = self.client.get(grocery_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        pumpkin_item = list(filter(lambda x: x["name"] == "Pumpkin Pie", response.data))
        blueberry_item = list(
            filter(lambda x: x["name"] == "Blueberry Pie", response.data)
        )
        self.assertEqual(len(pumpkin_item), 1)
        self.assertEqual(len(blueberry_item), 1)

    def test_get_specific_item(self):
        # Add item and get it
        item = GroceryItem.objects.create(name="Potato Chips", quantity=1)
        grocery_item_url = f"{grocery_url}{item.id}/"
        response = self.client.get(grocery_item_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        item_data = {"name": "Potato Chips", "quantity": 1, "is_purchased": False}
        self.assertEqual(response.data, item_data)

    def test_get_non_existant_item(self):
        # Get item that doesn't exist
        grocery_item_url = f"{grocery_url}1/"
        response = self.client.get(grocery_item_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_item_name_and_quantity(self):
        # Create item and check created
        item = GroceryItem.objects.create(name="Bananas", quantity=3)
        self.assertEqual(item.name, "Bananas")

        # Update item with PUT and check
        grocery_item_url = f"{grocery_url}{item.id}/"
        updated_item = {"name": "Banana", "quantity": 4, "is_purchased": False}
        response = self.client.put(grocery_item_url, updated_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_item = GroceryItem.objects.get(id=item.id)
        self.assertEqual(updated_item.name, "Banana")
        self.assertEqual(updated_item.quantity, 4)
        self.assertEqual(updated_item.is_purchased, False)

    def test_update_incorrect_format(self):
        # Create item and check created
        item = GroceryItem.objects.create(name="Bananas", quantity=3)
        self.assertEqual(item.name, "Bananas")

        # Update item with PUT and check bad request
        grocery_item_url = f"{grocery_url}{item.id}/"
        updated_item = {"name": "Banana", "is_purchased": False}
        response = self.client.put(grocery_item_url, updated_item)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_non_existant_item(self):
        # Update item with PUT and check not found
        grocery_item_url = f"{grocery_url}1/"
        updated_item = {"name": "Banana", "quantity": 4, "is_purchased": False}
        response = self.client.put(grocery_item_url, updated_item)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_set_item_purchased(self):
        # Create item and check created
        item = GroceryItem.objects.create(name="Bananas", quantity=3)
        self.assertEqual(item.name, "Bananas")

        # Update item with PUT and check
        grocery_item_url = f"{grocery_url}{item.id}/"
        updated_item = {"name": "Banana", "quantity": 4, "is_purchased": True}
        response = self.client.put(grocery_item_url, updated_item)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_item = GroceryItem.objects.get(id=item.id)
        self.assertEqual(updated_item.name, "Banana")
        self.assertEqual(updated_item.quantity, 4)
        self.assertEqual(updated_item.is_purchased, True)

    def test_delete_item(self):
        # Add item and delete it
        item = GroceryItem.objects.create(name="Potato Chips", quantity=1)
        self.assertEqual(item.name, "Potato Chips")

        grocery_item_url = f"{grocery_url}{item.id}/"
        response = self.client.delete(grocery_item_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        item_count = GroceryItem.objects.filter(id=item.id).count()
        self.assertEqual(item_count, 0)

    def test_delete_non_existant_item(self):
        # Delete non existant item and check not found
        grocery_item_url = f"{grocery_url}1/"
        response = self.client.delete(grocery_item_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
