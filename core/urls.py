from django.urls import path
from . import views

urlpatterns = [
    
    path("", views.inicio, name="inicio"),
    path("produtos/", views.produtos, name="produtos"),
    path("carrinho/", views.carrinho, name="carrinho"),
    path("finalizar-pedido/", views.finalizar_pedido, name="finalizar_pedido"),
    path("meus_pedidos.html", views.meus_pedidos, name="meus_pedidos"),

    path("api/produtos/", views.api_produtos, name="api_produtos"),
    path("api/pedidos/", views.api_pedidos, name="api_pedidos"),
    path("api/pedidos/<int:pedido_id>/", views.api_pedido_status, name="api_pedido_status"),

     # ADMINISTRATIVO
    path("administrativo/", views.admin_dashboard, name="admin_dashboard"),
    path("administrativo/pedidos/", views.admin_pedidos, name="admin_pedidos"),

    path(
    "administrativo/pedidos/detalhes/",
    views.admin_detalhes_pedido,
    name="admin_detalhes_pedido"),

    path("administrativo/clientes/", views.admin_clientes, name="admin_clientes"),

    path("administrativo/produtos/", views.admin_produtos, name="admin_produtos"),

]
