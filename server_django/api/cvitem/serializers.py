from rest_framework import serializers
from .models import CvItem

class CvItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CvItem
        fields = ["id", "cv", "detail"]
