from django.urls import path
from . import views

urlpatterns = [
    path('api/airesponse', views.aiResponse)
]
