from rest_framework import serializers
from django.contrib.auth.models import User
from .models import NewsArticle

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
    
class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = NewsArticle
        fields = [
            'id', 'title', 'href', 'image',
            'type', 'type_prefix', 'featured',
            'published'
        ]