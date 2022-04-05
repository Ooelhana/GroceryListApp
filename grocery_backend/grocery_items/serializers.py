from rest_framework import serializers
from .models import GroceryItem

# Grocery Item Serializer
class GroceryItemSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = GroceryItem
        fields = ["id", "name", "quantity", "is_purchased"]
