from django.urls import path 
from .views import (
  get_clients, 
  create_client, 
  client_detail
)


urlpatterns = [
  path("client/", get_clients, name = "get_clients"),
  path("client/create", create_client, name = "create_client"),
  path("client/get_clients", get_clients, name = "get_clients"),
  path("client/<str:cpf>", client_detail, name = "client_detail")
]
