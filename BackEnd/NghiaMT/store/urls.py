from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api-list/', views.apiOverView, name='apiOverView'),
    path('product-list-all/', views.ProductListAll, name='ProductListAll'),
    path('list/', views.ProductList, name='CategoryList'),
    path('create/', views.ProductCreate, name='create_product'),
    path('staticscal-product/', views.StatiscalProduct, name='StatiscalProduct'),
    path('user-comment/<str:slug>/', views.CheckIsUserComment, name='CheckIsUserComment'),
    path('detail/<str:slug>/', views.ProductDetail, name='CategoryCreate'),
    path('search/<str:text>/', views.ProductSearch, name='ProductSearch'),
    path('comments/<str:slug>/',
         views.ProductCommentList, name='ProductCommentList'),
    path('create-comment/',
         views.CreateProductComment, name='CreateProductComment'),
      path('check-comment/<str:slug>/',
         views.CheckPurchase, name='CheckPurchase'),   
    path('update/<str:pk>/',
         views.ProductUpdate, name='ProductUpdate'),
    path('delete/<str:pk>/',
         views.ProductDelete, name='ProductDelete'),
]
