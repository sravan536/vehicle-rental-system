from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone

from .models import Vehicle, Booking


def home(request):
    vehicles = Vehicle.objects.filter(available=True)[:6]

    return render(
        request,
        'rentalapp/home.html',
        {'vehicles': vehicles}
    )


def vehicles(request):
    vehicle_list = Vehicle.objects.filter(available=True)

    return render(
        request,
        'rentalapp/vehicles.html',
        {'vehicles': vehicle_list}
    )


def vehicle_detail(request, vehicle_id):
    vehicle = get_object_or_404(
        Vehicle,
        id=vehicle_id
    )

    return render(
        request,
        'rentalapp/vehicle_detail.html',
        {'vehicle': vehicle}
    )


@login_required
def booking(request, vehicle_id):

    vehicle = get_object_or_404(
        Vehicle,
        id=vehicle_id,
        available=True
    )

    if request.method == 'POST':

        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')

        if not start_date or not end_date:
            messages.error(
                request,
                'Please select both dates.'
            )

            return redirect(
                'booking',
                vehicle_id=vehicle.id
            )

        from datetime import datetime

        start = datetime.strptime(
            start_date,
            '%Y-%m-%d'
        ).date()

        end = datetime.strptime(
            end_date,
            '%Y-%m-%d'
        ).date()

        if end < start:
            messages.error(
                request,
                'End date cannot be before start date.'
            )

            return redirect(
                'booking',
                vehicle_id=vehicle.id
            )

        if start < timezone.now().date():
            messages.error(
                request,
                'Start date cannot be in the past.'
            )

            return redirect(
                'booking',
                vehicle_id=vehicle.id
            )

        days = (end - start).days + 1

        total_price = days * vehicle.price_per_day

        Booking.objects.create(
            user=request.user,
            vehicle=vehicle,
            start_date=start,
            end_date=end,
            total_price=total_price
        )

        messages.success(
            request,
            'Your booking has been created successfully!'
        )

        return redirect('dashboard')

    return render(
        request,
        'rentalapp/booking.html',
        {'vehicle': vehicle}
    )


def login_view(request):

    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            login(request, user)

            return redirect('dashboard')

        messages.error(
            request,
            'Invalid username or password.'
        )

    return render(
        request,
        'rentalapp/login.html'
    )


def logout_view(request):

    logout(request)

    return redirect('home')


@login_required
def dashboard(request):

    bookings = Booking.objects.filter(
        user=request.user
    ).order_by('-created_at')

    return render(
        request,
        'rentalapp/dashboard.html',
        {'bookings': bookings}
    )