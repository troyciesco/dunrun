"""
Serializers for the party api
"""

from rest_framework import serializers

from core.models import Party
from adventurer.serializers import AdventurerSerializer


class PartySerializer(serializers.ModelSerializer):
    """Serializer for parties"""

    adventurers = AdventurerSerializer(many=True, required=False)

    class Meta:
        model = Party
        fields = ["id", "name", "adventurers"]
        read_only_fields = ["id"]

    # def create(self, validated_data):
    #     """Create a recipe."""
    #     tags = validated_data.pop("tags", [])
    #     ingredients = validated_data.pop("ingredients", [])
    #     recipe = Recipe.objects.create(**validated_data)
    #     self._get_or_create_tags(tags, recipe)
    #     self._get_or_create_ingredients(ingredients, recipe)

    #     return recipe

    # def update(self, instance, validated_data):
    #     """Update a recipe."""
    #     tags = validated_data.pop("tags", None)
    #     ingredients = validated_data.pop("ingredients", None)
    #     if tags is not None:
    #         instance.tags.clear()
    #         self._get_or_create_tags(tags, instance)
    #     if ingredients is not None:
    #         instance.ingredients.clear()
    #         self._get_or_create_ingredients(ingredients, instance)

    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.save()
    #     return instance
