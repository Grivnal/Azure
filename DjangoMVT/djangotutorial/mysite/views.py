from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    # return HttpResponse("Привіт, команда!")
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')