# Generated by Django 4.1.6 on 2023-11-07 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0009_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('PENDING', 'Đang chờ xử lý'), ('SHIPPED', 'Đang giao hàng'), ('DELIVERED', 'Đã nhận hàng'), ('CANCELLED', 'Đã hủy')], default='PENDING', max_length=20),
        ),
    ]
