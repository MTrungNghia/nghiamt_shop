from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="Register"),
    path('admin-register/',
         views.AdminCreateUser, name="AdminCreateUser"),
     path('admin-delete/<str:id>/',
         views.AdminDeleteUser, name="AdminDeleteUser"),
     path('admin-update/<str:id>/',
         views.AdminUpdateUser, name="AdminUpdateUser"),
    path('login/', views.LoginView.as_view(), name="Login"),
    path('list/', views.UserList, name='UserList'),
    path('google-auth/', views.GoogleAuthAPIView.as_view(),
         name="GoogleAuthAPIView"),
    path('user-login-detail/', views.UserDetailLoginView.as_view(),
         name="UserDetailLoginView"),
    path('user/', views.UserView.as_view(), name="UserView"),
    path('admin/', views.UserAdminView.as_view(), name="UserAdminView"),
    path('change_password/<str:id>/',
         views.ChangePassword, name="ChangePassword"),
    path('logout/', views.LogoutView.as_view(), name="LogoutView"),
    path('refresh/', views.RefreshView.as_view(), name="RefreshView"),
    path('forgot/', views.ForgotAPIView.as_view(), name="ForgotAPIView"),
    path('reset/', views.ResetAPIView.as_view(), name="ResetAPIView"),

    # User address:
    path('list_user_address_by_user/<str:id>/',
         views.getUserAddressByUser, name="getUserAddressByUser"),
    path('list_user_address/',
         views.GetAddressView.as_view(), name="GetAddressView"),
    path('create_address/', views.UserAddressAPI.as_view(), name="UserAddressAPI"),
    path('create_user_address/', views.userAddressCreate, name="UserAddressCreateAPI"),
    path('update_user_address/', views.userAddressUpdate, name="userAddressUpdateAPI"),
    path('delete_user_address/<str:pk>/',
         views.deleteUserAddress, name="deleteUserAddress"),

]
