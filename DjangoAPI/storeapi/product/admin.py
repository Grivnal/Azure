from django.contrib import admin

# Register your models here.
from .models import Category, CustomUser, ProductImage, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at', 'updated_at']
    prepopulated_fields = {'slug': ('name',)}

# Вкладене відображення фото продукту
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

# Реєстрація продуктів
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]