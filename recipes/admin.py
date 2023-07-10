from django.contrib import admin

from .models import (Recipe, RecipeIngredient, RecipeComment,
                     RecipeStep, RecipeCommentImage, RecipeCommentVideo, 
                     RecipeImage, ShopLstRecipe, ShoppingLst)

# Register your models here.
admin.site.register(Recipe)
admin.site.register(RecipeIngredient)
admin.site.register(RecipeComment)
admin.site.register(RecipeCommentImage)
admin.site.register(RecipeCommentVideo)
admin.site.register(RecipeImage)
admin.site.register(RecipeStep)
admin.site.register(ShopLstRecipe)
admin.site.register(ShoppingLst)