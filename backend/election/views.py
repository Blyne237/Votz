from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from election.authorization import IsAdminAuthenticated, IsCustomerAuthenticated
from .models import Election, Candidate
from accounts.models import User
from .serializers import ElectionSerializer, CandidateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser


class ElectionViewSet(ViewSet):
    serializer_class = ElectionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_election_object(self, pk: str):
        try:
            election = Election.objects.get(pk=pk)
            return election
        except Election.DoesNotExist:
            data = {
                "status": False,
                "message": "This election does not exist."
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        return Response({"message": "this is the auth base url"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], name='elections', url_name='elections', permission_classes=[IsAuthenticated])
    def elections(self, request):
        elections = Election.objects.all()
        serializer = self.serializer_class(elections, many=True)
        return Response({
            "status": True,
            "message": "Elections listed successfully",
            "detail": serializer.data}, status=status.HTTP_200_OK)
        
  

    @action(detail=True, methods=['get'], name='election', url_name='election', permission_classes=[IsAuthenticated])
    def election(self, request, pk=None):
        election = get_object_or_404(Election, pk=pk)
        serializer = self.serializer_class(election, many=False)
        return Response({
            "status": True,
            "message": "Election retrieved successfully",
            "detail": serializer.data}, status=status.HTTP_200_OK)



    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(pk=request.user.pk)
            if user.role == "user":
                return Response({
                    "status": False,
                    "message": "You don't have the authorization to create an election",
                    "detail": serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
            if user.role == "admin":
                serializer.save()
                return Response({"status": True, "message": "Election created successfully"}, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": "Invalid data",
            "detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self, request, pk=None):
        election = self.get_election_object(pk=pk)
        if type(election) is Response:
            return election

        return Response({
            "status": True,
            "message": "This is the details of the election",
            "detail": self.serializer_class(election).data}, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        instance = get_object_or_404(Election, pk=pk)
        user = User.objects.get(pk=request.user.pk)
        serializer = self.serializer_class(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            if user.role == "admin":
                serializer.save()
                return Response({
                    "status": True,
                    "message": "Election updated successfully",
                    "detail": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": False,
                    "message": "You don't have the authorization to update an election",
                    "detail": serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], name='delete', url_name='delete', permission_classes=[IsAdminAuthenticated])
    def delete(self, request, pk=None):
        instance = get_object_or_404(Election, pk=pk)
        instance.delete()
        return Response({
            "status": True,
            "message": "Election deleted successfully",
        }, status=status.HTTP_204_NO_CONTENT)


class CandidateViewSet(ViewSet):
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        candidate = Candidate.objects.all()
        serializer = CandidateSerializer(candidate, many=True)
        return Response(serializer.data)
    
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(pk=request.user.pk)
            if user.role == "user":
                return Response({
                    "status": False,
                    "message": "You don't have the authorization to create a Candidate",
                    "detail": serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
            if user.role == "admin":
                serializer.save()
                return Response({"status": True, "message": "Candidate created successfully"}, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": "Invalid data",
            "detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        
    def update(self, request, pk=None):
        instance = get_object_or_404(Candidate, pk=pk)
        user = User.objects.get(pk=request.user.pk)
        serializer = self.serializer_class(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            if user.role == "admin":
                serializer.save()
                return Response({
                    "status": True,
                    "message": "Candidate updated successfully",
                    "detail": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": False,
                    "message": "You don't have the authorization to update a Candidate",
                    "detail": serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def retrieve(self, request, pk=None):
        queryset = Candidate.objects.all()
        candidate = get_object_or_404(queryset, pk=pk)
        serializer = CandidateSerializer(candidate)
        return Response({
            "status": True,
            "message": "Candidate retrieved successfully",
            "detail": serializer.data
        }, status=status.HTTP_200_OK)
        
    
    def delete(self, request, pk=None):
        instance = get_object_or_404(Candidate, pk=pk)
        instance.delete()
        return Response({
            "status": True,
            "message": "Candidate deleted successfully",
        }, status=status.HTTP_204_NO_CONTENT)
    
    