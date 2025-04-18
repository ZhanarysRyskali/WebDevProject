from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('register/', register_view, name='register'), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('logout/', logout_view, name='logout'), 

    path('categories/', category_list, name='category-list'),
    path('debts/', debt_list_create, name='debt-list-create'),
    path('transactions/', TransactionListCreate.as_view(), name='transaction-list-create'),
    path('goals/', GoalCRUD.as_view(), name='goal-crud'),
]
