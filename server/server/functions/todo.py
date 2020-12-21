import json
from django.http import JsonResponse

toDoList = []

def getList(request):
  return JsonResponse({'list': toDoList})

def addToList(request):
  inputObject = json.loads(request.body)
  toDoList.append(inputObject.get('new_item'))
  return JsonResponse({'updated_list': toDoList})

def clearList(request):
  toDoList.clear()
  return JsonResponse({'cleared_list': toDoList})