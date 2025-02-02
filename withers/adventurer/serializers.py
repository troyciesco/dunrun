"""
Serializers for the adventurer api
"""

from rest_framework import serializers

from core.models import Adventurer


class AdventurerSerializer(serializers.ModelSerializer):
    """Serializer for adventurers"""

    class Meta:
        model = Adventurer
        fields = [
            "id",
            "name",
            "species",
            "adventurer_class",
            "level",
            "strength",
            "dexterity",
            "constitution",
            "intelligence",
            "wisdom",
            "charisma",
            "armor_class",
            "hp_base",
            "hp_current",
        ]
        read_only_fields = ["id"]
