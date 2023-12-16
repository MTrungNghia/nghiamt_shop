from django.db import models
from store.models import Product
from account.models import User, UserAddress


class DiscountCode(models.Model):
    id = models.AutoField(primary_key=True)
    name_code = models.CharField(max_length=50, unique=True)
    discount = models.IntegerField()
    quantity = models.IntegerField()

    def __str__(self):
        return self.name_code


class Order(models.Model):
    # Khai báo các lựa chọn cho trường order_status
    ORDER_STATUS_CHOICES = (
        ('PENDING', 'Đang chờ xử lý'),
        ('SHIPPED', 'Đang giao hàng'),
        ('DELIVERED', 'Đã nhận hàng'),
        ('CANCELLED', 'Đã hủy'),
    )

    # Khai báo các lựa chọn cho trường payment_method
    PAYMENT_METHOD_CHOICES = (
        ('CREDIT_CARD', 'Thẻ tín dụng'),
        ('BANK_TRANSFER', 'Chuyển khoản ngân hàng'),
        ('COD', 'Thanh toán khi nhận hàng'),
        ('MOMO', 'Thanh toán bằng Momo'),
    )
    id = models.AutoField(primary_key=True)
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    user_address = models.ForeignKey(UserAddress, on_delete=models.CASCADE)
    discount_code = models.ForeignKey(
        DiscountCode, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.CharField(max_length=200, default=None, null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    quantity = models.PositiveIntegerField(default=0)
    order_status = models.CharField(
        max_length=20, choices=ORDER_STATUS_CHOICES, default='PENDING')
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_METHOD_CHOICES, default='COD')
    payment_status = models.CharField(max_length=20, choices=[('PENDING', 'Đang chờ thanh toán'), ('SUCCESS', 'Thanh toán thành công'), ('FAILED', 'Thanh toán thất bại')], default='PENDING')
    total_price = models.IntegerField(default=0)

class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, default=1)
    quantity = models.IntegerField()
    price = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def sub_total(self):
        return self.product.price * self.quantity
