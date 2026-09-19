from django.shortcuts import render


def inicio(request):
    return render(request, "cliente/inicio.html")


def produtos(request):
    return render(request, "cliente/produtos.html")


def carrinho(request):
    return render(request, "cliente/carrinho.html")


def finalizar_pedido(request):
    return render(request, "cliente/finalizar_pedido.html")

def meus_pedidos(request):
    return render(request, "cliente/meus_pedidos.html") 