from django.urls import path

from accounts.views import EditProfileView, MyRecipesView, SignUpView, LoginView, AddFavouriteView, MyProfileView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

app_name = 'accounts'
urlpatterns = [
    #path('editprofile/', EditProfileView.as_view(), name="editprofile"),
    path('myrecipes/', MyRecipesView.as_view(), name="myrecipes"),
    path('signup/', SignUpView.as_view(), name="signup"),
    path('login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('editprofile/<int:pk>/', EditProfileView.as_view(), name='editprofile'),
    path('addfavourite/<int:pk>/', AddFavouriteView.as_view(), name='add_favourite'),
    path('getinfo/', MyProfileView.as_view(), name='myinfo'),
]