# Generated by Django 4.1.7 on 2023-04-07 02:44

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipe_star_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='diets',
        ),
        migrations.AddField(
            model_name='recipe',
            name='diets',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('VE', 'Vegan'), ('HA', 'Halal')], max_length=5),
        ),
    ]
