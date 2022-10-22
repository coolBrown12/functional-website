from django.contrib import admin

from .models import Blog

@admin.register(Blog)

class Blogadmin(admin.ModelAdmin):
    list_display=['name','email','writting']

# Register your models here.
