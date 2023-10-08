from django.db import models
from api.cv.models import Cv

class CvItem(models.Model):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)
    detail = models.TextField()

    def __str__(self):
        return f"CvItem {self.detail}"
