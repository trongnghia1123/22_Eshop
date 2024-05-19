from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
# from .models import Cart

# Create your views here.
def home(request):
    return render(request, "home/index.html")

# @csrf_exempt
# @login_required
# def add_to_cart(request):
#     if request.method == 'POST':
#         product_id = request.POST.get('product_id')
#         if product_id:
#             try:
#                 product = Product.objects.get(id=product_id)
#                 cart, created = Cart.objects.get_or_create(user=request.user, product=product)
#                 cart.quantity += 1
#                 cart.save()
#                 return JsonResponse({'status': 'success', 'message': 'Product added to cart successfully!'})
#             except Product.DoesNotExist:
#                 return JsonResponse({'status': 'error', 'message': 'Product does not exist'}, status=404)
#         else:
#             return JsonResponse({'status': 'error', 'message': 'Invalid product ID'}, status=400)
#     return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)