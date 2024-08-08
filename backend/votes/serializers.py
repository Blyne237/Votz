from rest_framework import serializers

from .models import Vote

from accounts.serializers.output_serializer import UserSerializer
from election.serializers import ElectionSerializerWithoutCandidates, CandidateSerializer

class ListVoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    election = ElectionSerializerWithoutCandidates(read_only=True)
    candidate = CandidateSerializer(read_only=True)

    class Meta:
        model = Vote
        fields = ('id', 'user', 'election', 'candidate')

class CreateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('user', 'election', 'candidate')

    def create(self, validated_data):
        vote = self.Meta.model.objects.create(**validated_data)
        return vote