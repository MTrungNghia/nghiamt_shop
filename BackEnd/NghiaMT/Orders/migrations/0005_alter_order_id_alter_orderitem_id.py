# Generated by Django 4.1.6 on 2023-11-03 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0004_order_total_price_orderitem_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
