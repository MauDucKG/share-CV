from rest_framework import serializers
from .models import Cv


class CvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cv
        fields = ["id", "date", "type", "slug", "tags", "category", "summary",
                  "title", "status", "created_time", "full_width", "experience", "work_status"]
