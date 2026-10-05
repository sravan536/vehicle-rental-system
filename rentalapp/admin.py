from django.contrib import admin
from .models import Vehicle, Booking


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'vehicle_type',
        'brand',
        'model',
        'year',
        'price_per_day',
        'available'
    )

    list_filter = (
        'vehicle_type',
        'available'
    )

    search_fields = (
        'name',
        'brand',
        'model'
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'vehicle',
        'start_date',
        'end_date',
        'total_price',
        'status'
    )

    list_filter = (
        'status',
    )