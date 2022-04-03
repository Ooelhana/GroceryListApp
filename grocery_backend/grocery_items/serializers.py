from rest_framework import serializers
from .models import GroceryItem

# Grocery Item Serializer
class GroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItem
        fields = ["name", "quantity", "is_purchased"]
