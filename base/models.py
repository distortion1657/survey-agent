from uuid import uuid1

from django.db import models
from datetime import datetime
# Create your models here.
class AIResponse(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.response

class Participant(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True)
    name = models.CharField(null=True)
    response = models.FileField(null=True)

class Grading(models.Model):
    uuid = models.UUIDField(null=False)
    ai_response = models.JSONField()
    created_at = models.DateTimeField( default=datetime.now())
    
