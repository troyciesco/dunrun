"""
URL mappings for the adventurer app
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from adventurer import views

router = DefaultRouter()
router.register("", views.AdventurerViewSet)

app_name = "adventurer"

urlpatterns = [path("", include(router.urls))]
