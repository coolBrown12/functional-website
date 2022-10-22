
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.core.mail import send_mail

urlpatterns = [
    path('',views.home),
    path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('yash',views.yash,name='yash'),
    path('index2',views.index2,name='index2'),
    path('password-change/',auth_views.PasswordResetView.as_view(template_name="yash.html")),
    path('password-change/done/',auth_views.PasswordResetDoneView.as_view(),name='lost'),
    path('reset_password/',auth_views.PasswordResetView.as_view()),
    path('reset_password/',auth_views.PasswordResetView.as_view()),
]
