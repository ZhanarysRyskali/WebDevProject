from django.db import models
from django.contrib.auth.models import User

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} — {self.current_amount}/{self.target_amount}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Доход'),
        ('expense', 'Расход'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPES) 
    date = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} ({self.category})"

class Debt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    lender = models.CharField(max_length=100) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    due_date = models.DateField() 
    is_paid = models.BooleanField(default=False) 

    def __str__(self):
        return f"{self.lender}: {self.amount}т. (до {self.due_date})"
