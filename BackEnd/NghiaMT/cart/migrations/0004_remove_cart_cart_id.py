# Generated by Django 4.1.6 on 2023-07-03 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cart_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='cart_id',
        ),
    ]
