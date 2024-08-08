from rest_framework import serializers

class RegisterSerialiser(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=30)
    confirm_password = serializers.CharField(max_length=30)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=30)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=30)
    new_password = serializers.CharField(max_length=30)
    confirm_password = serializers.CharField(max_length=30)

# class ResetPasswordSerializer(serializers.Serializer):
#     email = serializers.CharField(max_length=300)