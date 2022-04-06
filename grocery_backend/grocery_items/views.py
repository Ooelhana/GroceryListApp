from rest_framework import viewsets
from .models import GroceryItem
from .serializers import GroceryItemSerializer

# Grocery Item Viewset
class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryItem.objects.all().order_by('id')
    serializer_class = GroceryItemSerializer
