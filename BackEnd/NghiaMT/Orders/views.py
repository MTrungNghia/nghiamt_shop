from rest_framework.decorators import api_view
from rest_framework.response import Response
from store.views import create_purchase
from account.models import User, UserAddress
from store.models import Product
from django.contrib.auth.decorators import login_required
from account.authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token, JWTAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from .models import Order, OrderItem, DiscountCode
from cart.models import Cart
from account.serializers import UserSerializer
from store.serializers import ProductSerializer
from .serializers import OrderSerializers, OrderItemSerializers, DiscountCodeSerializers
import base64


class DiscountCodeCreateAPIView(APIView):
    def get(self, request):
        sale_code = request.GET.get("sale_code", "")
        if not sale_code:
            return Response({"error": "Sale code is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            discount_code = DiscountCode.objects.get(name_code=sale_code)
            serializer = DiscountCodeSerializers(discount_code)
            return Response(serializer.data)
        except DiscountCode.DoesNotExist:
            return Response({"error": "Discount code not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = DiscountCodeSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def create_order_item(pro, order, quantity, price):
    product = Product.objects.get(id=pro)
    print(product)
    order_Item = OrderItem(product=product, order=order, quantity=quantity, price=price)
    order_Item.save()
    return order_Item


@api_view(['POST'])
def OrderCreate(request):
    data = request.data
    productList = request.data.getlist('product')
    pro_quantity = request.data.getlist('pro_quantity')
    price = request.data.getlist('price')
    user_address = UserAddress.objects.get(id=data['user_address'])
    user = User.objects.get(id=data['user'])
    if(data['discount_code'] != 'null'):
        discount_code = DiscountCode.objects.get(id=data['discount_code'])
    else:
        discount_code = None

    if(data['note'] != 'null'):
        note = data['note']
    else:
        note = None    
    order = Order(user_address = user_address,
                  user=user,
                  discount_code = discount_code,
                  note = note,
                  quantity = data['quantity'],
                  total_price = data['total_price'],
    )
    cart_id = data['cart']
    cart = Cart.objects.get(id=cart_id)
    print(order.quantity)
    print(order.total_price)
    # serializer = OrderSerializers(data=o)
    if order:
        order.save()
        newOrder = order.id
        print(newOrder)
        for i in range(len(productList)):
            print(productList[i])
            create_order_item(productList[i], order, pro_quantity[i], price[i])
        cart.delete()

        return Response(newOrder, status=201)

    return Response("Error order", status=400)

@api_view(['GET'])
def GetDetailOrderByUser(request, id):
    order = Order.objects.get(id=id)
    serializer = OrderSerializers(order, many=False)
    user_address = UserAddress.objects.get(id=serializer.data['user_address'])
    order_item = OrderItem.objects.filter(order=order)
    orderItemSerializers = OrderItemSerializers(order_item, many=True)
    product_list = []
    order_data = serializer.data
    for orderItem in orderItemSerializers.data:
        productItem = Product.objects.get(id=orderItem['product'])
        productSerializers = ProductSerializer(productItem, many = False)
        product = productSerializers.data
        # for productItem in productSerializers.data:
        #     productDetail = {
        #     'product_name': productItem['product_name'],
        #     'product_image': productItem['image'],
        #     'price': productItem['price'],
        #     'quantity': orderItem['quantity'],
        #     'total_price': orderItem['price'],
        #     }
        #     product_list.append(productDetail)
        product_item = {
            'image': product['image'],
            'product_name': product['product_name'],
            'price': product['price'],
            'quantity': orderItem['quantity'],
        }
        product_list.append(product_item)
    finish = order_data['order_status'] == 'Đã nhận hàng'
    order_data = {
        'id': order_data['id'],
        'name': user_address.full_name,
        'address': user_address.address,
        'quantity': order_data['quantity'],
        'phone_number': user_address.phone_number,
        # 'discount_code': order['discount_code'],
        'order_status': order_data['order_status'],
        'payment_method': order_data['payment_method'],
        'total_price': order_data['total_price'],
        'date_added': order_data['date_added'],
        'note': order_data['note'],
        "finsish": finish,
    }
    order_detail = {
        'order': order_data,
        'products': product_list,
    }
    return Response(order_detail)

@api_view(['GET'])
def GetListOrder(request):
    orders = Order.objects.all().order_by('-id')
    serializer = OrderSerializers(orders, many=True)

    order_list = []
    for order in serializer.data:
        user_address = UserAddress.objects.get(id=order['user_address'])
        finish = order['order_status'] == 'Đã nhận hàng' or order['order_status'] == 'Đã hủy'
        order_data = {
            'id': order['id'],
            'name': user_address.full_name,
            'address': user_address.address,
            'quantity': order['quantity'],
            # 'discount_code': order['discount_code'],
            'order_status': order['order_status'],
            'payment_method': order['payment_method'],
            'total_price': order['total_price'],
            'date_added': order['date_added'],
            'note': order['note'],
            "finish": finish,
        }
        order_list.append(order_data)

    return Response(order_list)

@api_view(['GET'])
def GetListOrderByUser(request):
    auth = get_authorization_header(request).split()

    if auth and len(auth) == 2:
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        user = User.objects.filter(pk=id).first()
        orders = Order.objects.filter(user=user)
        serializer = OrderSerializers(orders, many=True)

        order_list = []
        for order in serializer.data:
            user_address = UserAddress.objects.get(id=order['user_address'])
            finish = order['order_status'] == 'Đã nhận hàng' or order['order_status'] == 'Đã hủy'
            order_data = {
                'id': order['id'],
                'name': user_address.full_name,
                'address': user_address.address,
                'quantity': order['quantity'],
                # 'discount_code': order['discount_code'],
                'order_status': order['order_status'],
                'payment_method': order['payment_method'],
                'total_price': order['total_price'],
                'date_added': order['date_added'],
                'note': order['note'],
                "finish": finish,
            }
            order_list.append(order_data)

        return Response(order_list)

    raise AuthenticationFailed('Unauthenticated!')

@api_view(['GET'])
def StatiscalRevenue(request):
    orders = Order.objects.all()
    serializer = OrderSerializers(orders, many=True)
    total = 0
    order_list = []
    for orderItem in serializer.data:
        user_address = UserAddress.objects.get(id=orderItem['user_address'])
        order_data = {
            'name': user_address.full_name,
            'address': user_address.address,
            'order_status': orderItem['order_status'],
            'payment_method': orderItem['payment_method'],
            'total_price': orderItem['total_price'],
            'date_added': orderItem['date_added'],
            'note': orderItem['note']
        }
        total += orderItem['total_price']
        order_list.append(order_data)
        
    data = {
        'orders': order_list,
        'total': total,
    }

    return Response(data)


@api_view(['POST'])
def CancelOrder(request, id):
    order = Order.objects.get(id=id)
    order.order_status = 'CANCELLED'
    order.save()

    return Response('success', 200)

@api_view(['POST'])
def ConfirmDelivered(request, id):
    order = Order.objects.get(id=id)
    order.order_status = 'DELIVERED'
    order_item = OrderItem.objects.filter(order=order)
    orderItemSerializers = OrderItemSerializers(order_item, many=True)
    for orderItem in orderItemSerializers.data:
        productItem = Product.objects.get(id=orderItem['product'])
        create_purchase(order.user,productItem)
    order.save()

    return Response('success', 200)
# @api_view(['GET'])s

# class OrderAPIView(APIView):
#     def get(self, request):
#         auth = get_authorization_header(request).split()

#         if auth and len(auth) == 2:
#             token = auth[1].decode('utf-8')
#             id = decode_access_token(token)

#             user = User.objects.filter(pk=id).first()
#             try:

#                 cart = Cart.objects.get(user=user)
#                 serializer = CartSerializers(instance=cart)
#                 # get cart item in cart:

#             except Cart.DoesNotExist:
#                 cart = Cart.objects.create(user=user)
#                 serializer = CartSerializers(instance=cart)
#             print(cart.quantity)
#             cartItems = CartItem.objects.filter(cart=cart)
#             itemSerializer = CartItemSerializers(instance=cartItems, many=True)
#             listP = []
#             for PItem in cartItems:
#                 p_name = PItem.product.product_name
#                 p_slug = PItem.product.slug
#                 p_price = PItem.product.price
#                 p_image = PItem.product.image
#                 print(str(p_image))
#                 p_invetory = PItem.product.inventory
#                 product = {
#                     'product_name': p_name,
#                     'slug': p_slug,
#                     'price': p_price,
#                     'image': str(p_image),
#                     'inventory': p_invetory,
#                     'quantity': PItem.quantity
#                 }

#                 listP.append(product)

#             cart = {
#                 'cart': serializer.data,
#                 'item_cart': itemSerializer.data,
#                 'list_product': listP,
#             }

#             return Response({"cart_detail": cart})
#         raise AuthenticationFailed('Unauthenticated!')
