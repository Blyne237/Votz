from rest_framework.permissions import BasePermission


class IsAdminAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)


class IsProviderAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and not request.user.is_superuser and not request.user.is_staff and request.user.role == "professionnel")


class IsCustomerAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and not request.user.is_superuser and not request.user.is_staff and request.user.role == "user")
