# Generated by Django 4.1.6 on 2023-10-27 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0003_order_discount_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='price',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
