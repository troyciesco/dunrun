"""
Views for the adventurer api
"""

from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)

from core.models import Party
from party import serializers


class PartyViewSet(viewsets.ModelViewSet):
    """View for manage party APIs"""

    serializer_class = serializers.PartySerializer
    queryset = Party.objects.all()
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    # def _params_to_ints(self, qs):
    #     """Convert a list of strings to integers."""
    #     return [int(str_id) for str_id in qs.split(",")]

    # def get_queryset(self):
    #     """Retrieve recipes for authenticated user"""
    #     tags = self.request.query_params.get("tags")
    #     ingredients = self.request.query_params.get("ingredients")
    #     queryset = self.queryset
    #     if tags:
    #         tag_ids = self._params_to_ints(tags)
    #         queryset = queryset.filter(tags__id__in=tag_ids)
    #     if ingredients:
    #         ingredient_ids = self._params_to_ints(ingredients)
    #         queryset = queryset.filter(ingredients__id__in=ingredient_ids)

    #     return queryset.filter(user=self.request.user).order_by("-id").distinct()

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == "list":
            return serializers.PartySerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new party"""
        serializer.save(user=self.request.user)
