from django.test import TestCase
from .models import GroceryItem

class GroceryItemTestCase(TestCase):
    def test_create_item(self):
        # Ensure there are no items in db
        items = GroceryItem.objects.all()
        self.assertFalse(items)

        # Create grocery item and check that it is created
        GroceryItem.objects.create(name="Test Item", quantity=1, is_purchased=False)
        item_count = GroceryItem.objects.filter(name="Test Item", quantity=1, is_purchased=False).count()
        self.assertEqual(item_count, 1)


