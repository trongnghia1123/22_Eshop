# Generated by Django 5.0.4 on 2024-05-19 20:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vehicle', '0003_alter_vehicle_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehicle',
            name='description',
        ),
    ]
