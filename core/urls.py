from django.urls import path
from . import views

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("produtos/", views.produtos, name="produtos"),
    path("carrinho/", views.carrinho, name="carrinho"),
    path("finalizar-pedido/", views.finalizar_pedido, name="finalizar_pedido"),
    path("meus_pedidos.html", views.meus_pedidos, name="meus_pedidos"),
]