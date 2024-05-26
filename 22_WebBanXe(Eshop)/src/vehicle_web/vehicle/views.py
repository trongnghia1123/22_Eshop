from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import generics
from django.utils import timezone
from datetime import timedelta
from .models import Vehicle, VehicleDetail
from .serializers import VehicleSerializer
from django.views.generic import DetailView
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response

class VehicleListAPIView(generics.ListAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    
class VehicleDetailView(DetailView):
    model = Vehicle
    template_name = 'vehicle_detail.html'

def vehicle_detail(request, vehicle_id):
    vehicle = get_object_or_404(Vehicle, pk=vehicle_id)
    try:
        vehicle_detail = VehicleDetail.objects.get(vehicle_id=vehicle_id)
    except VehicleDetail.DoesNotExist:
        messages.warning(request, 'Sản phẩm chưa có thông tin chi tiết.')
        return redirect('home')
    return render(request, 'vehicle/vehicle_detail.html', {'vehicle': vehicle, 'vehicle_detail': vehicle_detail})

# def load_new_vehicles(request):
#     try:
#         start_date = timezone.now() - timedelta(days=3)
#         end_date = timezone.now() + timedelta(days=3)
#         new_vehicles = Vehicle.objects.filter(created_at__range=[start_date, end_date])
#         return render(request, 'vehicle/vehicle.html', {'new_vehicles': new_vehicles})
#     except Exception as e:
#         messages.warning(request, 'Chưa có sản phẩm mới!!!')
#         return redirect('home')
def load_new_vehicles(request):
    try:
        start_date = timezone.now() - timedelta(days=3)
        end_date = timezone.now() + timedelta(days=3)
        new_vehicles = Vehicle.objects.filter(created_at__range=[start_date, end_date])
        serializer = VehicleSerializer(new_vehicles, many=True) 
        return JsonResponse(serializer.data, safe=False)
    except Exception as e:
        return JsonResponse({'error': 'Chưa có sản phẩm mới!!!'}, status=500)