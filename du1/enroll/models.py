
from django.db import models

# Create your models here.
class Blog(models.Model):
    # writting=models.CharField(max_length=70)
    name=models.CharField( max_length=50)
    email=models.EmailField()
    writting=models.CharField(max_length=50)
