from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import generics
from .models import Vehicle, VehicleDetail
from .serializers import VehicleSerializer
from django.views.generic import DetailView
from django.contrib import messages

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