# Generated by Django 4.1.6 on 2023-11-04 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0007_alter_discountcode_id_alter_order_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='note',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
    ]
