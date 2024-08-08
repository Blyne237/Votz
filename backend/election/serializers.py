from rest_framework import serializers
from .models import Election, Candidate


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'election', 'name', 'description', 'vote_count')

class ElectionSerializer(serializers.ModelSerializer):
    candidate_set = CandidateSerializer(many=True, read_only=True)

    class Meta:
        model = Election
        fields = ('id', 'name', 'description', 'start_date', 'end_date', 'created_at', 'candidate_set')

class ElectionSerializerWithoutCandidates(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ('id', 'name', 'description', 'start_date', 'end_date', 'created_at')
