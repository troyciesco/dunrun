from django.contrib import admin
from .models import Party, Adventurer


class AdventurerInline(admin.TabularInline):
    model = Adventurer
    extra = 1
    show_change_link = True  # Adds a link to edit the adventurer in detail
    autocomplete_fields = ["party"]  # Enables autocomplete for better performance
    fields = [
        "name",
        "species",
        "adventurer_class",
        "level",
    ]  # Customize visible fields to prevent overflow


@admin.register(Party)
class PartyAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

    def get_readonly_fields(self, request, obj=None):
        # Show the list of adventurers in this party on the party detail page
        return ["get_adventurers"]

    def get_adventurers(self, obj):
        return ", ".join([a.name for a in obj.adventurers.all()])

    get_adventurers.short_description = "Current Adventurers"


@admin.register(Adventurer)
class AdventurerAdmin(admin.ModelAdmin):
    list_display = ["name", "species", "adventurer_class", "level", "party"]
    list_editable = ["party"]  # This allows quick editing of party assignment
    autocomplete_fields = ["party"]
