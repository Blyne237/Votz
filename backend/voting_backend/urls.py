
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


from accounts.views import AuthViewSet
from votes.views import VotesViewSet
from election.views import ElectionViewSet, CandidateViewSet


from rest_framework import routers
routers = routers.DefaultRouter()

routers.register('auth', AuthViewSet, basename='auth')
routers.register('election', ElectionViewSet, basename='election')
routers.register('candidate', CandidateViewSet, basename='candidate')
routers.register('vote', VotesViewSet, basename='vote')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(routers.urls)),
    
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
