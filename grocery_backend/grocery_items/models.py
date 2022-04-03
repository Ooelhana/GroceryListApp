from django.db import models


class GroceryItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    is_purchased = models.BooleanField(default=False)
