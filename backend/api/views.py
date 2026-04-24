from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer
from rest_framework.authtoken.views import ObtainAuthToken  # OOTB login
from .models import NewsArticle
from .serializers import NewsArticleSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Protected test endpoint (proves token works)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({"username": request.user.username})

class RecentNewsView(APIView):
    """
    GET /api/news/recent/?limit=5
    Returns the N most recent articles. Marks the most recent as featured.
    """
    def get(self, request):
        limit   = int(request.query_params.get('limit', 5))
        articles = NewsArticle.objects.order_by('-published')[:limit]
        serialized = NewsArticleSerializer(articles, many=True).data

        # Mark the first result as featured (most recent)
        if serialized:
            serialized[0]['featured'] = True

        return Response(serialized)
    
class NewsArticleDetailView(RetrieveAPIView):
    """GET /api/news/<id>/"""
    queryset           = NewsArticle.objects.all()
    serializer_class   = NewsArticleSerializer


class NewsArticleListCreateView(ListCreateAPIView):
    """
    GET  /api/news/          — all articles
    POST /api/news/          — create one (auth required later)
    """
    queryset         = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    filter_backends  = [filters.OrderingFilter]
    ordering_fields  = ['published']
    ordering         = ['-published']