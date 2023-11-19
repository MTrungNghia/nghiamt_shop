from rest_framework import serializers
from .models import Category


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategoryUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name', 'description', 'cate_image']
