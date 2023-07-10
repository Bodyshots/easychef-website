from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, HttpResponseNotAllowed
from django.shortcuts import render, get_object_or_404
from django.template.response import TemplateResponse
from django.views import View
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.serializers import SignUpSerializer, EditProfileSerializer, LoginSerializer, MyRecipesSerializer, AddFavouriteSerializer, MyProfileSerializer
from accounts.models import User
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer
from  rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SignUpView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

class AddFavouriteView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AddFavouriteSerializer

class EditProfileView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EditProfileSerializer

class MyRecipesView(RetrieveAPIView):
    serializer_class = MyRecipesSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer


class MyProfileView(RetrieveAPIView):
    serializer_class = MyProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)