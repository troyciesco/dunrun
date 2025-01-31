from django.db import models
from django.core.validators import MinValueValidator


class Species(models.TextChoices):
    DRAGONBORN = "Dragonborn", "Dragonborn"
    DWARF = "Dwarf", "Dwarf"
    ELF = "Elf", "Elf"
    GNOME = "Gnome", "Gnome"
    HALFLING = "Halfling", "Halfling"
    HALF_ELF = "Half-Elf", "Half-Elf"
    HALF_ORC = "Half-Orc", "Half-Orc"
    HUMAN = "Human", "Human"
    TIEFLING = "Tiefling", "Tiefling"


class AdventurerClass(models.TextChoices):
    BARBARIAN = "Barbarian", "Barbarian"
    BARD = "Bard", "Bard"
    CLERIC = "Cleric", "Cleric"
    DRUID = "Druid", "Druid"
    FIGHTER = "Fighter", "Fighter"
    MONK = "Monk", "Monk"
    PALADIN = "Paladin", "Paladin"
    RANGER = "Ranger", "Ranger"
    ROGUE = "Rogue", "Rogue"
    SORCERER = "Sorcerer", "Sorcerer"
    WARLOCK = "Warlock", "Warlock"
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
    hp_base = models.PositiveSmallIntegerField(default=10)
    hp_current = models.PositiveSmallIntegerField(default=10)

    def __str__(self):
        return self.name
