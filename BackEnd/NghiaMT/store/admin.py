from django.contrib import admin
from .models import Product, ProductImage, ProductComment, Purchase
# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'inventory')
    prepopulated_fields = {'slug': ('product_name',)}


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(ProductComment)
admin.site.register(Purchase)
