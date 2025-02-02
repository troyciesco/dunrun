from django.db import models
from django.core.validators import MinValueValidator


class Species(models.TextChoices):
    DWARF = "Dwarf", "Dwarf"
    ELF = "Elf", "Elf"
    HALFLING = "Halfling", "Halfling"
    HUMAN = "Human", "Human"


class AdventurerClass(models.TextChoices):
    BARD = "Bard", "Bard"
    CLERIC = "Cleric", "Cleric"
    FIGHTER = "Fighter", "Fighter"
    ROGUE = "Rogue", "Rogue"
    WIZARD = "Wizard", "Wizard"


class Adventurer(models.Model):
    """Adventurer object."""

    name = models.CharField(max_length=255)
    species = models.CharField(max_length=255, choices=Species.choices)
    adventurer_class = models.CharField(max_length=255, choices=AdventurerClass.choices)
    level = models.PositiveSmallIntegerField(
        default=1, validators=[MinValueValidator(1)]
    )
    strength = models.PositiveSmallIntegerField(default=8)
    dexterity = models.PositiveSmallIntegerField(default=8)
    constitution = models.PositiveSmallIntegerField(default=8)
    intelligence = models.PositiveSmallIntegerField(default=8)
    wisdom = models.PositiveSmallIntegerField(default=8)
    charisma = models.PositiveSmallIntegerField(default=8)
    armor_class = models.PositiveSmallIntegerField(default=10)
    hp_base = models.PositiveSmallIntegerField(default=10)
    hp_current = models.PositiveSmallIntegerField(default=10)
    party = models.ForeignKey(
        "Party",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="adventurers",
    )

    def __str__(self):
        return self.name


class Party(models.Model):
    """Party object."""

    class Meta:
        verbose_name_plural = "Parties"

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
