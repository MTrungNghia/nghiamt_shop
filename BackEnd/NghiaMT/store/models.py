from django.db import models
from django.urls import reverse
import uuid
from django.utils import timezone
from account.models import User
from category.models import Category
from django.utils.text import slugify
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


def generate_filename(instance, filename):
    # Tạo tên tệp duy nhất bằng cách sử dụng uuid4
    unique_filename = f"{uuid.uuid4().hex}_{timezone.now().strftime('%Y%m%d%H%M%S')}"

    # Trả về đường dẫn tệp mới
    return f"photo/products/{unique_filename}.png"


def generate_slug(name):
    # Sử dụng slugify để chuyển đổi giá trị thành dạng slug
    slug = slugify(name)
    return slug


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(max_length=2000, blank=True)
    price = models.IntegerField()
    inventory = models.IntegerField()
    quantity_sold = models.IntegerField(default=0)
    image = models.ImageField(upload_to=generate_filename, blank=True)
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now_add=True)

    def get_url(self):
        return reverse('product_detail', args=[self.category.slug, self.slug])

    def save(self, *args, **kwargs):
        # Tạo giá trị slug từ product_name
        self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.product_name


class ProductComment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200, blank=True)
    rate = models.PositiveSmallIntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )
    comment = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.first_name} on {self.product.product_name}'


class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Images = models.ImageField(upload_to=generate_filename, blank=True)

    def __str__(self):
        return str(self.product)
