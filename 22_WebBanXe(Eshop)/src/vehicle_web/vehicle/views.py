from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Vehicle
from .serializers import VehicleSerializer
from django.views.generic import DetailView

class VehicleListAPIView(generics.ListAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    
class VehicleDetailView(DetailView):
    model = Vehicle
    template_name = 'vehicle_detail.html'

def vehicle_detail(request, vehicle_id):
    vehicle = get_object_or_404(Vehicle, pk=vehicle_id)
    return render(request, 'vehicle/vehicle_detail.html', {'vehicle': vehicle})