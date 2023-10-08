from django.urls import path, include
from api.cv.views import (
    CvListApiView,
    CvDetailApiView
)


urlpatterns = [
    path('cv/', CvListApiView.as_view()),
    path('cv/<int:id>/', CvDetailApiView.as_view()),
]
