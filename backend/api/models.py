from django.db import models

class NewsArticle(models.Model):
    class ArticleType(models.TextChoices):
        PRESS_RELEASE = 'press-release', 'Press Release'
        PRESS_MENTION = 'press-mention', 'Press Mention'
        POST          = 'post',          'Post'

    title = models.CharField(max_length=500)
    image = models.ImageField(upload_to='news/', blank=True, null=True, default=None)
    type = models.CharField(max_length=20, choices=ArticleType.choices)
    type_prefix = models.CharField(max_length=100, blank=True)
    featured = models.BooleanField(default=False)
    published = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.TextField(blank=True, default="")

    class Meta:
        ordering = ['-published']

    def __str__(self):
        return self.title