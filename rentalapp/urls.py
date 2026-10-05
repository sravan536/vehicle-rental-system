from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),

    path(
        'vehicles/',
        views.vehicles,
        name='vehicles'
    ),

    path(
        'vehicle/<int:vehicle_id>/',
        views.vehicle_detail,
        name='vehicle_detail'
    ),

    path(
        'booking/<int:vehicle_id>/',
        views.booking,
        name='booking'
    ),

    path(
        'login/',
        views.login_view,
        name='login'
    ),

    path(
        'logout/',
        views.logout_view,
        name='logout'
    ),

    path(
        'dashboard/',
        views.dashboard,
        name='dashboard'
    ),
]