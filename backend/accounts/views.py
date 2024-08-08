from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.conf import settings

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action, authentication_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny

from accounts.functions.check_password import password_check

from accounts.functions.login_user import login_user
from accounts.serializers.input_serializer import ChangePasswordSerializer, LoginSerializer, RegisterSerialiser
from accounts.serializers.output_serializer import UserSerializer
from accounts.functions.check_token import expires_in
from accounts.authentication import ExpiringTokenAuthentication
from accounts.models import User


@authentication_classes([ExpiringTokenAuthentication])
class AuthViewSet(ViewSet):
    serializer_class = UserSerializer
    register_serializer = RegisterSerialiser
    change_password_serializer = ChangePasswordSerializer
    login_serializer = LoginSerializer

    def get_object(self, email: str):
        try:
            account = User.objects.get(email=email)
            if account.email:
                return account
        except User.DoesNotExist:
            data = {
                "status": False,
                "message": "This accounts dows not exist."
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        return Response({
            "message": "this is the auth base url"},
            status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], name='register', url_name='register', permission_classes=[AllowAny])
    def register(self, request):
        serializer = self.register_serializer(data=request.data)
        if serializer.is_valid():

            if not password_check(serializer.data["password"]):
                return Response({
                    "status": False,
                    "message": "Weak Password !."},
                    status=status.HTTP_400_BAD_REQUEST)

            if serializer.data["password"] != serializer.data["confirm_password"]:
                return Response({
                    "status": False,
                    "message": "Les mots de passe ne correspondent pas"},
                    status=status.HTTP_400_BAD_REQUEST)

            user_serializer = self.serializer_class(data=request.data)

            if user_serializer.is_valid():
                password = make_password(serializer.data["password"])
                user_serializer.save(password=password)
                email = user_serializer.data["email"]

                account = self.get_object(email)
                if type(account) is Response:
                    return account
                return Response({
                    "status": True,
                    "message": "Account created successfully"},
                    status=status.HTTP_200_OK)
            return Response({
                "status": False,
                "message": "Personal info already used",
                "detail": user_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": False,
            "message": "This user exist already",
            "detail": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], name='login', url_name='login', permission_classes=[AllowAny])
    def login(self, request):
        user_serializer = self.login_serializer(data=request.data)

        if user_serializer.is_valid():
            email = user_serializer.data["email"]
            password = user_serializer.data["password"]

            account = self.get_object(email)
            if type(account) is Response:
                return account
            if account.is_superuser is True:
                data = login_user(account)
                return Response({
                    "status": True,
                    "message": "Login successful",
                    "detail": data
                }, status=status.HTTP_200_OK)

            if not check_password(password, account.password):
                data = {
                    "status": False,
                    "message": "Your email or password is incorrect."
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            if account.is_active:
                data = login_user(account)
                return Response({
                    "status": True,
                    "code": 0,
                    "message": "Utilisateur connecté avec succès",
                    "detail": data
                }, status=status.HTTP_200_OK)
            return Response({
                "status": True,
                "message": "Votre compte est inactif, veuillez contacter l'administrateur",
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "status": False,
            "message": "Votre compte est désactivé, veuillez contacter l'administrateur"
        }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], name='change-password', url_name='change-password', permission_classes=[IsAuthenticated])
    def change_password(self, request):
        serializer = self.change_password_serializer(data=request.data)
        if serializer.is_valid():
            if not check_password(serializer.data['old_password'], request.user.password):
                return Response({
                    "status": False,
                    "message": "Ancien mot de passe incorrect"},
                    status=status.HTTP_400_BAD_REQUEST)

            if not password_check(serializer.data['new_password']):
                return Response({
                    "status": False,
                    "message": "Weak password"},
                    status=status.HTTP_400_BAD_REQUEST)

            if serializer.data["new_password"] != serializer.data["confirm_password"]:
                return Response({
                    "status": False,
                    "message": "Les mots de passe ne correspondent pas"},
                    status=status.HTTP_400_BAD_REQUEST)

            user = self.get_object(request.user.email)
            if type(user) is Response:
                return user

            user.set_password(serializer.data["new_password"])
            token, _ = Token.objects.get_or_create(user=request.user)
            token.delete()
            user.save()
            return Response({
                "status": True,
                "message": "Mot de passe modifié avec succès"},
                status=status.HTTP_200_OK)

        return Response({
            "status": False,
            "message": "Données saisies invalides",
            "detail": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], name='info', url_name='info', permission_classes=[IsAuthenticated])
    def info(self, request):
        try:
            account = User.objects.get(email=request.user.email)
        except User.DoesNotExist:
            data = {
                "status": False,
                "message": "Ce compte n'existe pas."
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        if account.is_active:
            token = Token.objects.get(user=account)
            user_serializer = self.serializer_class(account, many=False)
            data = user_serializer.data
            data['expired_in'] = expires_in(token)
            data['token'] = token.key
            return Response({
                "status": True,
                "message": "Utilisatuer connecté",
                "detail": data
            }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['put'], name='modify', url_name='modify', permission_classes=[IsAuthenticated])
    def modify(self, request):
        try:
            instance = User.objects.get(email=request.user.email)
        except User.DoesNotExist:
            data = {
                "status": False,
                "message": "Ce compte n'existe pas."
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Vos données ont été mises à jour",
                "detail": serializer.data}, status=status.HTTP_200_OK)
        return Response({
            "status": False,
            "message": "Données saisies invalides",
            "detail": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], name='logout', url_name='logout', permission_classes=[IsAuthenticated])
    def logout(self, request):
        request.user.auth_token.delete()
        data = {"status": True, "message": "Déconnexion réussie"}
        return Response(data, status=status.HTTP_200_OK)
