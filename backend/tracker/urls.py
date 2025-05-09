from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .views import *

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('categories/', category_list, name='category-list'),
    path('transactions/', TransactionListCreate.as_view(), name='transaction-list-create'),
    path('goals/', GoalCRUD.as_view(), name='goal-crud'),
    path('goals/<int:pk>/', GoalCRUD.as_view(), name='goal-crud'),

]
