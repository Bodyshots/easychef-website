from django.conf import settings
from django.urls import path
from recipes.views import (AddRecipeView, RecipeView, RecipesView,RecipeCommentVideoView, EditRecipeStepView,
                           AddRecipeImageView, RecipeIngredientsView, RecipeCommentView, RecipeStepView, 
                           RecipeCommentImageView, EditRecipeView, ShopListAddRecipeView,
                           ShopListEditRecipeView, ShopListDeleteRecipeView, ShopListAddRecipeView,
                           ShoppingListView, RecipeCopyView, RecipeIngredientsView, RecipeIngredientView, LikeRecipeView,
                           FavRecipeView, ShopListViewRecipeView)

                           
app_name = 'recipes'
urlpatterns = [
    path('addrecipe/', AddRecipeView.as_view(), name="addrecipe"),
    path('<int:recipe_id>/', RecipeView.as_view(), name="recipe"),
    path('<int:recipe_id>/copy/', RecipeCopyView.as_view(), name="copyrecipe"),
    path('<int:recipe_id>/edit/', EditRecipeView.as_view(), name="editdeleterecipe"),
    path('<int:recipe_id>/like/', LikeRecipeView.as_view(), name='likerecipe'),
    path('<int:recipe_id>/fav/', FavRecipeView.as_view(), name='favrecipe'),
    path('<int:recipe_id>/addstep/', RecipeStepView.as_view(), name="addrecipestep"),
    path('<int:recipe_id>/addingredient/', RecipeIngredientView.as_view(), name="addrecipeingredient"),
    path('<int:recipe_id>/<int:ingredient_id>/edit/', RecipeIngredientView.as_view(), name="editdeleterecipeingredient"),
    path('<int:recipe_id>/addimage/', AddRecipeImageView.as_view(), name="addrecipeimage"),
    path('<int:recipe_id>/deleteimage/<int:image_id>/', AddRecipeImageView.as_view(), name="deleterecipeimage"),
    path('<int:recipe_id>/<int:step_id>/', EditRecipeStepView.as_view(), name="editrecipestep"),
    path('<int:recipe_id>/<int:step_id>/', EditRecipeStepView.as_view(), name="deleterecipestep"),
    path('<int:recipe_id>/addcomment/', RecipeCommentView.as_view(), name="addcomment"),
    path('<int:recipe_id>/<int:comment_id>/addimage/', RecipeCommentImageView.as_view(), name="addcommentimage"),
    path('<int:recipe_id>/<int:comment_id>/image/<int:image_id>/', RecipeCommentImageView.as_view(), name="deletecommentimage"),
    path('<int:recipe_id>/<int:comment_id>/addvideo/', RecipeCommentVideoView.as_view(), name="addcommentvideo"),
    path('<int:recipe_id>/<int:comment_id>/video/<int:video_id>/', RecipeCommentVideoView.as_view(), name="deletecommentvideo"),
    path('<int:recipe_id>/ingredients/', RecipeIngredientsView.as_view(), name="recipeingredients"),
    path('all/', RecipesView.as_view(), name="allrecipes"),
    path('myshoppinglist/', ShoppingListView.as_view(), name="myshoppinglist"),
    path('myshoppinglist/add/', ShopListAddRecipeView.as_view(), name="addmyshoppinglist"),
    path('myshoppinglist/edit/<int:pk>/', ShopListEditRecipeView.as_view(), name="editmyshoppinglist"),
    path('myshoppinglist/delete/<int:pk>/', ShopListDeleteRecipeView.as_view(), name="deletemyshoppinglist"),
    path('myshoppinglist/<int:pk>/', ShopListViewRecipeView.as_view(), name="viewshoplstrecipe"),

]
