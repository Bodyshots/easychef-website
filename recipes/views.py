from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from recipes.models import (Recipe, RecipeIngredient, ShopLstRecipe, ShoppingLst, 
                            RecipeImage, RecipeCommentImage, RecipeComment, 
                            RecipeCommentVideo, RecipeStep)
from recipes.serializers import (RecipeSerializer, RecipeIngredientSerializer,
                                 ShoppingLstSerializer, RecipeCommentSerializer, RecipeStepSerializer, 
                                 RecipeCommentImageSerializer,
                                 RecipeImageSerializer, RecipeCommentVideoSerializer,
                                 ShopListRecipeAddSerializer, ShopListEditRecipeSerializer,
                                 ShopListDeleteRecipeSerializer, RecipeCopySerializer, RecipeIngredientSerializer,
                                 LikeRecipeSerializer, FavRecipeSerializer, ShopListRecipeSerializer)
from rest_framework import serializers
from recipes.permissions import LstOwner


# Create your views here.
# TODO: Remember token authentication!
## https://www.django-rest-framework.org/api-guide/authentication/

class RecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Recipe.objects.all().order_by('id')

class AddRecipeImageView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeImageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeImage, id=self.kwargs['image_id'], recipe=recipe)

class RecipeCopyView(CreateAPIView):
    serializer_class = RecipeCopySerializer
    permission_classes = [IsAuthenticated]


class RecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

class RecipeIngredientsView(ListAPIView):
    serializer_class = RecipeIngredientSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return RecipeIngredient.objects.filter(recipe=get_object_or_404(Recipe, id=self.kwargs['recipe_id'])).order_by('id')

class RecipeIngredientView(CreateAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeIngredientSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeIngredient, id=self.kwargs['ingredient_id'], recipe=recipe)

class AddRecipeView(CreateAPIView):  
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

class EditRecipeView(UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

class LikeRecipeView(CreateAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = LikeRecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

class FavRecipeView(CreateAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = FavRecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

class RecipeCommentView(CreateAPIView, UpdateAPIView):
    serializer_class = RecipeCommentSerializer
    permission_classes = [IsAuthenticated]

class RecipeCommentImageView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeCommentImageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        comment = get_object_or_404(RecipeComment, id=self.kwargs['comment_id'], recipe=recipe)
        return get_object_or_404(RecipeCommentImage, id=self.kwargs['image_id'], comment=comment)

class RecipeCommentVideoView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeCommentVideoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        comment = get_object_or_404(RecipeComment, id=self.kwargs['comment_id'], recipe=recipe)
        return get_object_or_404(RecipeCommentVideo, id=self.kwargs['video_id'], comment=comment)

class RecipeStepView(CreateAPIView):
    serializer_class = RecipeStepSerializer
    permission_classes = [IsAuthenticated]


class EditRecipeStepView(UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeStepSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeStep, id=self.kwargs['step_id'], recipe=recipe)

class ShoppingListView(RetrieveAPIView):
    serializer_class = ShoppingLstSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(ShoppingLst, owner=self.request.user)

class ShopListViewRecipeView(RetrieveAPIView):
    serializer_class = ShopListRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]

    def get_object(self):
        return get_object_or_404(ShopLstRecipe, id=self.kwargs['pk'])

class ShopListAddRecipeView(CreateAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListRecipeAddSerializer
    permission_classes = [IsAuthenticated]

class ShopListEditRecipeView(UpdateAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListEditRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]

class ShopListDeleteRecipeView(DestroyAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListDeleteRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]
