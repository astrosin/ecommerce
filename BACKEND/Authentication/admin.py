from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

class CustomAdmin(UserAdmin):
    list_display = ['mobile', 'name', 'id']
    list_filter = (
        'active',
    )
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('mobile', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('mobile', 'password1', 'password2', 'name',),}),)

admin.site.register(User, CustomAdmin)