import json
from django.http import JsonResponse

def increment(request):
  num = json.loads(request.body).get('Num')
  num += 1
  response = JsonResponse({'updated_count':num})
  return response

def decrement(request):
  num = json.loads(request.body).get('Num')
  num -= 1
  response = JsonResponse({'updated_count':num})
  return response