from rest_framework import serializers
from .models import Product, ProductImage, ProductComment, Purchase


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','product_name', 'description','quantity_sold',
                  'price', 'inventory', 'image', 'category']


class ProductCommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProductComment
        fields = '__all__'

class PurchaseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'
