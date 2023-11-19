from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    #     path('api-list/', views.apiOverView, name='apiOverView'),
    #     path('list/', views.CategoryList, name='CategoryList'),
    #     path('listOther/<str:slug>/',
    #          views.CategoryListOther, name='CategoryListOther'),
    #     path('create/', views.CategoryCreate, name='CategoryCreate'),
    #     path('products/<str:slug>/', views.ProductsByCategory,
    #          name='ProductsByCategory'),
    #     path('products-by-categorys/<str:slug1>/<str:slug2>/',
    #          views.ProductsByCategorys, name='ProductsByCategorys'),
    #     path('update/<str:pk>/',
    #          views.CategoryUpdate, name='CategoryUpdate'),
    #     path('delete/<str:pk>/',
    #          views.CategoryDelete, name='CategoryDelete'),
     path('create-discount-code/', views.DiscountCodeCreateAPIView.as_view(),
         name='create-discount-code'),
     path('create-order/', views.OrderCreate,
         name='create-order'),   
     path('list-all/', views.GetListOrder,
         name='GetListOrder'),     
     path('list-by-user/', views.GetListOrderByUser,
         name='GetListOrderByUser'), 
    path('staticscal-revenue/', views.StatiscalRevenue, name='StatiscalRevenue'),
     path('order-detail/<str:id>/', views.GetDetailOrderByUser,
         name='GetDetailOrderByUser'),  
     path('cancel-order/<str:id>/', views.CancelOrder,
         name='CancelOrder'),  
     path('confirm-delivered/<str:id>/', views.ConfirmDelivered,
         name='ConfirmDelivered'), 
]
