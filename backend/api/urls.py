from django.urls import path
from .views import RegisterView,NewsArticleListCreateView, NewsArticleDetailView, RecentNewsView, profile
from rest_framework.authtoken.views import ObtainAuthToken

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', ObtainAuthToken.as_view(), name='login'),
    path('profile/', profile, name='profile'),
    path('news/', NewsArticleListCreateView.as_view()),
    path('news/recent/', RecentNewsView.as_view()),
    path('news/<int:pk>/', NewsArticleDetailView.as_view()),
]