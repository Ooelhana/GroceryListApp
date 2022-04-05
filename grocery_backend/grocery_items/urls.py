from django.urls import path, include
from rest_framework import routers
from .views import GroceryItemViewSet

router = routers.DefaultRouter()
router.register(r"groceryitems", GroceryItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
