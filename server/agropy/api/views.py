# from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Client
from .serializer import ClientSerializer


@api_view(['GET'])
def get_clients(request):
  users = Client.objects.all()
  serializer = ClientSerializer(users, many = True)
  return Response(serializer.data)  

@api_view(["POST"])
def create_client(request):
  print("hello")
  serializer = ClientSerializer(data = request.data)
  if(serializer.is_valid()):
    serializer.save()
    return Response(serializer.data, status = status.HTTP_201_CREATED)
  return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
def client_detail(request, cpf):
  try: 
    user = Client.objects.get(CPF = cpf)
  except Client.DoesNotExist:
    return Response(status = status.HTTP_404_NOT_FOUND)
    
  if request.method == "GET":
    serializer = ClientSerializer(user)
    return Response(serializer.data)
  elif request.method == "PUT":
    serializer = ClientSerializer(user, data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  elif request.method == "DELETE":
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)




# @api_view(['GET'])
# def get_users(request):
#   users = User.objects.all()
#   serializer = UserSerializer(users, many = True)
#   return Response(serializer.data)

  
# @api_view(["POST"])
# def create_user(request):
#   serializer = UserSerializer(data = request.data)
#   if(serializer.is_valid()):
#     serializer.save()
#     return Response(serializer.data, status = status.HTTP_201_CREATED)
#   return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  
# @api_view(["GET", "PUT", "DELETE"])
# def user_detail(request, pk):
#   try: 
#     user = User.objects.get(pk = pk)
#   except User.DoesNotExist:
#     return Response(status = status.HTTP_404_NOT_FOUND)
  
#   if request.method == "GET":
#     serializer = UserSerializer(user)
#     return Response(serializer.data)
#   elif request.method == "PUT":
#     serializer = UserSerializer(user, data = request.data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
#   elif request.method == "DELETE":
#     user.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(["GET"])
# def get_books(requeust):
#   books = Book.objects.all()
#   serializer = BookSerializer(books, many = True)
#   return Response(serializer.data)


# @api_view(["POST"])
# def create_book(request):
#   serializer = BookSerializer(data = request.data)
#   if(serializer.is_valid()):
#     serializer.save()
#     return Response(serializer.data, status = status.HTTP_201_CREATED)
#   return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# @api_view(["GET", "PUT", "DELETE"])
# def book_detail(request, pk):
#   try: 
#     book = Book.objects.get(pk = pk)
#   except Book.DoesNotExist:
#     return Response(status = status.HTTP_404_NOT_FOUND)
  
#   if request.method == "GET":
#     serializer = BookSerializer(book)
#     return Response(serializer.data)
#   elif request.method == "PUT":
#     serializer = BookSerializer(book, data = request.data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
#   elif request.method == "DELETE":
#     book.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)

