from django.urls import path
from . import views

urlpatterns = [
    path('api/generate-ai-response', views.generateAIResponse),
    path('api/get-ai-response', views.getAIResponse)
]
