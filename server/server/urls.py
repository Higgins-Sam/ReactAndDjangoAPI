from django.urls import path
from . import views
from .functions import counter, calculator, todo, propertySearch

app_name = 'backend'
urlpatterns = [
    path('api/hello/', views.hello, name='hello'),
    path('api/counter/increment', counter.increment, name='increment'),
    path('api/counter/decrement', counter.decrement, name='decrement'),
    path('api/calculator/add', calculator.add, name='add'),
    path('api/calculator/subtract', calculator.subtract, name='subtract'),
    path('api/calculator/multiply', calculator.multiply, name='multiply'),
    path('api/calculator/divide', calculator.divide, name='divide'),
    path('api/todo/get/', todo.getList, name='getList'),
    path('api/todo/add', todo.addToList, name='addToList'),
    path('api/todo/clear', todo.clearList, name='clearList'),
    path('api/property/search', propertySearch.search, name='search'),
    path('api/property/filter', propertySearch.filter_properties, name='filter_properties'),
    path('api/property/get', propertySearch.get_results, name='get_results'),
]
