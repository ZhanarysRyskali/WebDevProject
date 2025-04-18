from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .models import Transaction, Goal, Category, Debt
from .serializers import TransactionSerializer, GoalSerializer, CategorySerializerManual, DebtSerializerManual
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class TransactionListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoalCRUD(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        goals = Goal.objects.filter(user=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializerManual(categories, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def debt_list_create(request):
    if request.method == 'GET':
        debts = Debt.objects.filter(user=request.user)
        serializer = DebtSerializerManual(debts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DebtSerializerManual(data=request.data)
        if serializer.is_valid():
            Debt.objects.create(user=request.user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logged out successfully'})
