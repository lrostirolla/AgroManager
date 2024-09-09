from django.db import models

class Client(models.Model):
  CPF = models.CharField(max_length = 11, unique = True, blank=False)
  client_name = models.CharField(max_length=300)
  farm_name = models.CharField(max_length=300)
  city = models.CharField(max_length=300)
  state = models.CharField(max_length = 2)
  total_area = models.FloatField()
  useful_area = models.FloatField()
  vegetation_area = models.FloatField()
  crops = models.CharField(max_length=10, choices = [
    ('1', "Soja"), 
    ('2', 'Milho'), 
    ('3', 'Algodão'), 
    ('4', 'Café'), 
    ('5', 'Cana de Açucar')
  ])
  
  