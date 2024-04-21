from .models import Vehicle, VehicleDetail
from rest_framework import serializers, viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class VehicleSerializer(serializers.ModelSerializer):
    status_display = serializers.SerializerMethodField(source='get_status_display', read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'

    def get_status_display(self, obj):
        if obj.status == True:
            return "Còn hàng"
        else:
            return "Hết hàng"
        
class VehiclePriceFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Vehicle
        fields = ['min_price', 'max_price']

        
class VehicleDetailViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleDetail
        fields = '__all__'

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = VehiclePriceFilter
    filterset_fields = ['status'] # Tìm kiếm theo trạng thái
    search_fields = ['title', 'price'] # Tìm kiếm theo tên và mô tả

class VehicleDetailViewSet(viewsets.ModelViewSet):
    queryset = VehicleDetail.objects.all()
    serializer_class = VehicleDetailViewSerializer
    
