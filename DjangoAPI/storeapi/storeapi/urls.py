"""
URL configuration for storeapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from product.views import CategoryViewSet, ProductViewSet, ProductImageViewSet, RegisterView, CurrentUserView, GoogleLoginView, LoginView, PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('products', ProductViewSet, basename='product')
router.register('product-images', ProductImageViewSet, basename='product-image')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', CurrentUserView.as_view(), name='current_user'),
    path('api/password-reset-request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('api/password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)