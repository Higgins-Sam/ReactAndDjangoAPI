import json
from django.http import JsonResponse

def decodeRequest(request):
  return json.loads(request.body)

def add(request):
  inputObject = decodeRequest(request)
  result = inputObject.get('first') + inputObject.get('second')
  return JsonResponse({'answer':result})

def subtract(request):
  inputObject = decodeRequest(request)
  result = inputObject.get('first') - inputObject.get('second')
  return JsonResponse({'answer':result})

def multiply(request):
  inputObject = decodeRequest(request)
  result = inputObject.get('first') * inputObject.get('second')
  return JsonResponse({'answer':result})

def divide(request):
  inputObject = decodeRequest(request)
  result = inputObject.get('first') / inputObject.get('second')
  return JsonResponse({'answer':result})