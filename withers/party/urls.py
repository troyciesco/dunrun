"""
URL mappings for the adventurer app
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from party import views

router = DefaultRouter()
router.register("", views.PartyViewSet)

app_name = "party"

urlpatterns = [path("", include(router.urls))]
