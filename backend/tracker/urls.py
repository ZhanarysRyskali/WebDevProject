from django.urls import path

from .views import *

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),

    path('categories/', category_list, name='category-list'),

    path('debts/', debt_list_create, name='debt-list-create'),

    path('transactions/', TransactionListCreate.as_view(), name='transaction-list-create'),

    path('goals/', GoalCRUD.as_view(), name='goal-crud'),
]
