# Generated by Django 4.1.6 on 2023-11-03 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_purchase_productcomment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.UUIDField(primary_key=True, serialize=False),
        ),
    ]
