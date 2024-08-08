from rest_framework import serializers

from accounts.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "last_login", "username", "role", "email", "created_at", "updated_at",]