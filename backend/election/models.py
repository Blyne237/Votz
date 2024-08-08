from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Model to represent Election Data
class Election(models.Model):
    name = models.CharField(max_length=256)
    description = models.CharField(max_length=2000, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    start_date = models.DateTimeField(default=timezone.now, editable=False)
    end_date = models.DateField(null=True, blank=True)

    def winner(self):
        return self.candidate_set.all().order_by('vote_count').reverse()[0]

    def __str__(self):
        return self.name


# Model to represent candidates' data and the election in which they are participating
class Candidate(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, unique=True)
    description = models.CharField(max_length=2000, null=True)
    vote_count = models.IntegerField(null=False, default=0)

    def add_vote(self):
        self.vote_count += 1
        self.save()

    def remove_vote(self):
        self.vote_count -= 1
        self.save()

    def __str__(self):
        return f'{self.name} ({self.vote_count})'
