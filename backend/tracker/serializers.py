from rest_framework import serializers
from .models import Category, Debt, Transaction, Goal

class CategorySerializerManual(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)


class DebtSerializerManual(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    lender = serializers.CharField(max_length=100)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    due_date = serializers.DateField()
    is_paid = serializers.BooleanField()

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['user', 'date']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'
        read_only_fields = ['user', 'created_at']