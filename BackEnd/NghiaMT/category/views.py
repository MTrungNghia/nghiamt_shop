from __future__ import unicode_literals
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from .serializers import CategorySerializers, CategoryUpdateSerializers
from .models import Category
# Product:
from store.serializers import ProductSerializers, ProductImageSerializers
from store.models import Product, ProductImage
# Create your views here.
from util.views import CustomPagination
from django.utils.text import slugify


@api_view(['GET'])
def apiOverView(request):
    api_urls = {
        'List': 'list/',
        'Create category': 'create/',
        'Product Detail': 'product-detail/<str:slug>/',
        'Update category': 'update/<str:pk>/',
        'Delete category': 'delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def CategoryList(request):
    categoris = Category.objects.all()
    serializer = CategorySerializers(categoris, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def CategoryListOther(request, slug):
    category = Category.objects.filter(slug=slug).first()
    serializerCategory = CategorySerializers(category, many=False)
    data = serializerCategory.data
    categoris = Category.objects.filter(~Q(slug=slug))
    serializer = CategorySerializers(categoris, many=True)
    data['listCategoryDifference'] = serializer.data

    return Response(data)


# @api_view(['GET'])
# def ProductsByCategory(request, slug):
#     paginator = PageNumberPagination()
#     paginator.page_size = 8
#     category = Category.objects.get(slug=slug)
#     cateSerializer = CategorySerializers(category, many=False)

#     listPro = cateSerializer.data
#     products = Product.objects.filter(category=category)
#     paginated_products = paginator.paginate_queryset(products, request)
#     proSerializer = ProductSerializers(paginated_products, many=True)
#     listPro['products'] = proSerializer.data

#     return Response(listPro)

# @api_view(['GET'])
# def ProductsByCategory(request, slug):
#     paginator = PageNumberPagination()
#     paginator.page_size = 8
#     category = Category.objects.get(slug=slug)
#     products = Product.objects.filter(category=category)
#     paginated_products = paginator.paginate_queryset(products, request)
#     proSerializer = ProductSerializers(paginated_products, many=True)

#     return paginator.get_paginated_response(proSerializer.data)

@api_view(['GET'])
def ProductsByCategory(request, slug):
    paginator = CustomPagination()
    paginator.page_size = 12
    category = Category.objects.get(slug=slug)
    products = Product.objects.filter(category=category).order_by('-created_date')
    paginated_products = paginator.paginate_queryset(products, request)
    proSerializer = ProductSerializers(paginated_products, many=True)

    return paginator.get_paginated_response(proSerializer.data)


@api_view(['GET'])
def ProductsByCategorys(request, slug1, slug2):
    categories = Category.objects.filter(id__in=[slug1, slug2])
    response_data = []

    for category in categories:
        # products = Product.objects.filter(category=category)[:12]
        products = Product.objects.filter(category=category).order_by('-created_date')[:12]
        categories_serializer = CategorySerializers(category, many=False)
        products_serializer = ProductSerializers(products, many=True)

        category_data = {
            'category': categories_serializer.data,
            'products': products_serializer.data
        }

        response_data.append(category_data)

    return Response(response_data)

def create_category(name, des, image):
    slug = slugify(name)
    category = Category(category_name=name, slug=slug, description= des, cate_image=image)
    print(category.id)
    category.save()

@api_view(['POST'])
def CategoryCreate(request):
    print(request.data)
    data = request.data
    name = data['category_name']
    des = data['description']
    image = data['cate_image']
    cate = create_category(name, des, image)
    serializer = CategorySerializers(data=cate)
    serializer.is_valid()
        # serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def CategoryUpdate(request, pk):
    data=request.data
    print(request.data)
    category = Category.objects.get(id=pk)
    category.category_name = data['category_name']
    category.description = data['description']
    if(data['cate_image']):
        category.cate_image = data['cate_image']
    print(data['cate_image'])
    category.save()
    serializer = CategoryUpdateSerializers(data=category)
    serializer.is_valid()
        # serializer.save()
    print(serializer.data)
    return Response(serializer.data)


@api_view(['DELETE'])
def CategoryDelete(request, pk):
    category = Category.objects.get(id=pk)
    category.delete()

    return Response("Category succesfully delete")
