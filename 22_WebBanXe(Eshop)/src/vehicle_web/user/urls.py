from django.urls import path
from .views import LoginAPIView, SignUpAPIView

urlpatterns = [
    path('api/login/', LoginAPIView.as_view(), name='api_login'),
    path('api/signup/', SignUpAPIView.as_view(), name='api_signup'),
]
