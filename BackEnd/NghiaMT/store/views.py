from __future__ import unicode_literals
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import get_authorization_header
from account.authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token, JWTAuthentication

from .serializers import ProductImageSerializers, ProductSerializers, ProductSerializer, ProductCommentSerializers, PurchaseSerializers
from .models import Product, ProductComment, ProductImage, Purchase
from account.models import User
from Orders.models import Order

from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
# Create your views here.
from util.views import CustomPagination

def checkUserComment(user, product):
    existPurchase = Purchase.objects.filter(user=user, product=product).exists()
    existComment = ProductComment.objects.filter(user=user, product=product).exists()
    if existPurchase and (not existComment):
        return 1
    return 0


@api_view(['GET'])
def apiOverView(request):
    api_urls = {
        'List': 'list/',
        'Create product': 'product_create/',
        'Product Detail': 'product-detail/<str:slug>/',
        'Update product': 'product-update/<str:pk>/',
        'Delete product': 'product-delete/<str:pk>/',
    }
    return Response(api_urls)


def create_product(p_id, image_file):
    PImage = ProductImage(product=p_id, Images=image_file)
    PImage.save()
    return PImage


@api_view(['POST'])
def ProductCreate(request):
    data = request.data
    ImageList = request.data.getlist('ImageList')
    serializer = ProductSerializer(data=data)
    ImageList = list(filter(lambda x: x != 'null', ImageList))

    if serializer.is_valid():
        product_instance = serializer.save()

        # Kiểm tra xem sản phẩm có được tạo thành công hay không
        if product_instance:
            for imageItem in ImageList:
                create_product(p_id=product_instance, image_file=imageItem)

            return Response(serializer.data, status=201)
        else:
            return Response({"error": "Failed to create product"}, status=500)

    return Response(serializer.errors, status=400)



@api_view(['GET'])
def ProductList(request):
    paginator = PageNumberPagination()
    paginator.page_size = 8  # Số lượng bản ghi trên mỗi trang

    products = Product.objects.all().order_by('-id')
    paginated_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializers(products, many=True)

    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def ProductListAll(request):
    products = Product.objects.all().order_by('-id')
    serializer = ProductSerializers(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def CheckIsUserComment(request, slug):
    is_comment = 0
    auth = get_authorization_header(request).split()
    product = Product.objects.get(slug=slug)
    user_id = ''
    name = ''
    isUserComment = {}
    if auth and len(auth) == 2:
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        user = User.objects.filter(pk=id).first()
        user_id = id
        name = user.last_name + ' '+ user.first_name
        is_comment = checkUserComment(user, product)
        print(is_comment)
    isUserComment['is_comment'] = is_comment
    isUserComment['name'] = name
    isUserComment['user_id'] = user_id

    return Response(isUserComment)

@api_view(['GET'])
def ProductDetail(request, slug):
    product = Product.objects.get(slug=slug)
    proDerializer = ProductSerializers(product, many=False)
    pDetail = proDerializer.data
    pDetail['category_name'] = product.category.category_name
    pDetail['category_slug'] = product.category.slug
    proImgs = ProductImage.objects.filter(product=product)
    imageDerializer = ProductImageSerializers(proImgs, many=True)
    pDetail['images'] = imageDerializer.data

    return Response(pDetail)

@api_view(['GET'])
def ProductAllDetail(request, id):
    product = Product.objects.filter(pk=id).first()
    proDerializer = ProductSerializers(product, many=False)
    pDetail = proDerializer.data
    pDetail['category_id'] = product.category.id
    # pDetail['category_name'] = product.category.category_name
    # pDetail['category_slug'] = product.category.slug
    proImgs = ProductImage.objects.filter(product=product)
    imageDerializer = ProductImageSerializers(proImgs, many=True)
    pDetail['images'] = imageDerializer.data

    return Response(pDetail)

@api_view(['GET'])
def ProductSearch(request, text):
    paginator = CustomPagination()
    paginator.page_size = 16  # Số lượng bản ghi trên mỗi trang
    products = Product.objects.filter(product_name__icontains=text)
    sort_option = request.query_params.get('sort_option')
    if sort_option != 'null':
        if sort_option == 'A-Z':
            products = products.order_by('product_name')
        elif sort_option == 'Z-A':
            products = products.order_by('-product_name')
        elif sort_option == 'PriceAsc':
            products = products.order_by('price')
        elif sort_option == 'PriceDesc':
            products = products.order_by('-price')
        elif sort_option == 'Newest':
            products = products.order_by('-created_date')
        elif sort_option == 'Oldest':
            products = products.order_by('created_date')
    
    paginated_products = paginator.paginate_queryset(products, request)
    proSerializer = ProductSerializers(paginated_products, many=True)

    return paginator.get_paginated_response(proSerializer.data)

@api_view(['GET'])
def StatiscalProduct(request):
    products = Product.objects.filter(quantity_sold__gt=0)
    serializer = ProductSerializers(products, many=True)
    product_list = []
    sold_total = 0
    for productItem in serializer.data:
        sold_total += productItem['quantity_sold']
        
    data = {
        'products': serializer.data,
        'sold_total': sold_total,
    }

    return Response(data)

# @api_view(['POST'])
# def ProductUpdate(request, pk):
#     product = Product.objects.get(id=pk)
#     serializer = ProductSerializers(instance=product, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     print(serializer.data)
#     return Response(serializer.data)

@api_view(['POST'])
def ProductUpdate(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    data = request.data
    # print(data)
    # if(data['image'][0] == 'null'):
    #     data['image'] = product.image
    # print(data)
    serializer = ProductSerializer(instance=product, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def ProductDelete(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response("Product succesfully delete")

@api_view(['GET'])
def ProductCommentList(request, slug):
    product = Product.objects.get(slug=slug)
    productComments = ProductComment.objects.filter(product=product)
    serializer = ProductCommentSerializers(productComments, many=True)
    productCommentList = []
    for productCommentItem in serializer.data:
        user = User.objects.get(id=productCommentItem['user'])
        name = user.last_name + ' ' + user.first_name
        productComment = {
            'name': name,
            'comment': productCommentItem['comment'],
            'comment_date': productCommentItem['comment_date'],
            'rate': productCommentItem['rate'],
            'date' : productCommentItem['comment_date'],
        }
        productCommentList.append(productComment)
    data = {
        'product_list': productCommentList,
        'product': product.id,
        'product_name': product.product_name,
    }

    return Response(data)

@api_view(['POST'])
def CreateProductComment(request):
    data = request.data
    print(data)
    serializer = ProductCommentSerializers(data=data)
    if serializer.is_valid():
        serializer.save()
    print(serializer.data)

    return Response(serializer.data, status=201)


@api_view(['GET'])
def CheckPurchase(request, slug):
    product = Product.objects.get(slug=slug)
    productComments = ProductComment.objects.filter(product=product)
    if(len(productComments) != 0):
        productPurchase = Purchase.objects.filter(product=product)
        if(len(productPurchase) != 0):
            return Response({
            "purchase": False
            })
        else:
            return Response({
            "purchase": True
            })
    
    return Response({
    "purchase": False
    })

def create_purchase(user, product):
    purchase = Purchase(user=user, product=product)
    purchase.save()
    serializer = PurchaseSerializers(purchase)
    return serializer.data
    