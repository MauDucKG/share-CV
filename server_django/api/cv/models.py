from django.db import models


TYPE_CHOICES = [
    ("VI", "Vietnamese"),
    ("EN", "English"),
    ("OT", "Other"),
]
STATUS_CHOICES = [
    ("ON", "on"),
    ("OFF", "off"),
]


class Cv(models.Model):
    date = models.CharField(max_length=255, default='')
    type = models.CharField(choices=TYPE_CHOICES, default="EN", max_length=2)
    slug = models.CharField(max_length=255, unique=True, default='')
    tags = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255, default='')
    status = models.CharField(choices=STATUS_CHOICES,
                              default="OFF", max_length=3)
    created_time = models.CharField(max_length=255, default='')
    full_width = models.BooleanField(default=False)
    experience = models.TextField(default='')
    work_status = models.CharField(max_length=255, default='')

    def __str__(self):
        return f"Cv {self.title}"
