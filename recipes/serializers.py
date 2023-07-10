from rest_framework import serializers

import accounts.models
from recipes.models import (Recipe, RecipeIngredient, 
                            RecipeStep, RecipeComment, 
                            RecipeCommentImage, ShopLstRecipe, ShoppingLst,
                            RecipeImage, RecipeCommentVideo)

from recipes.helpers import (collect_ingredients, assign_ingredient, collect_ingredients_x,
                             get_pic_rep)
from django.shortcuts import get_object_or_404
from datetime import datetime

QUANTITY = 0
UNIT = 1
DECIMAL_PLACES = 2

class RecipeCopySerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    name = serializers.ReadOnlyField()
    description = serializers.ReadOnlyField()
    servings = serializers.ReadOnlyField()
    cook_time = serializers.ReadOnlyField()
    prep_time = serializers.ReadOnlyField()
    cuisine = serializers.ReadOnlyField()
    star_rating = serializers.ReadOnlyField()
    likes = serializers.ReadOnlyField()
    favourited = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = '__all__'
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        n = {}
        n['owner'] = self.context['request'].user
        if 'name' not in validated_data:
            n['name'] = recipe.name
        if 'description' not in validated_data:
            n['description'] = recipe.description
        if 'cookingtimetag' not in validated_data:
            n['cookingtimetag'] = recipe.cookingtimetag
        if 'servings' not in validated_data:
            n['servings'] = recipe.servings
        if 'cuisine' not in validated_data:
            n['cuisine'] = recipe.cuisine
        if 'prep_time' not in validated_data:
            n['prep_time'] = recipe.prep_time
        if 'cook_time' not in validated_data:
            n['cook_time'] = recipe.cook_time
        new_recipe = super().create(validated_data | n)
        for step in recipe.steps.all():
            new_step = RecipeStep(description=step.description, step_num=step.step_num, date_created=datetime.now(),recipe=new_recipe)
            new_step.save()
        for ingredient in recipe.ingredients.all():
            new_ingredient = RecipeIngredient(recipe = new_recipe, name = ingredient.name, quantity=ingredient.quantity)
            new_ingredient.save()
        for image in recipe.images.all():
            new_image = RecipeImage(recipe = new_recipe, image = image.image)
            new_image.save()
        return new_recipe

    def get_ingredients(self, instance):
        return collect_ingredients(instance)
    
    def get_steps(self, instance):
        steps = {}
        for step in instance.steps.all().order_by('step_num'):
            steps[f"{step.step_num}"] = step.description
        return steps

    def get_images(self, instance):
        images = {}
        for image in instance.images.all():
            images[f"{image.id}"] = image.image.url
        return images
    
    def get_videos(self, instance):
        videos = {}
        for video in instance.videos.all():
            videos[f"{video.id}"] = video.video.url
        return videos
    
    def get_comments(self,instance):
        comments = {}
        for comment in instance.comments.all():
            curr_comment = {}
            curr_comment["description"] = comment.description
            curr_comment["images"] = self.get_images(comment)
            curr_comment["videos"] = self.get_videos(comment)
            comments[f'{comment.id}'] = curr_comment
        return comments
    
    def to_representation(self, instance):
        orig_rep = super().to_representation(instance)
        rep = {
            'Recipe Details': orig_rep,
            'Ingredients': self.get_ingredients(instance),
            'Instructions': self.get_steps(instance),
            'Images': self.get_images(instance),
            'Comments': self.get_comments(instance)
        }
        return rep

class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    star_rating = serializers.ReadOnlyField()
    likes = serializers.ReadOnlyField()
    favourited = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = '__all__'
    
    def create(self, validated_data):
        return super().create(validated_data | {'owner': self.context['request'].user})
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.id != instance.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        if 'name' in validated_data:
            instance.name = validated_data['name']
        if 'description' in validated_data:    
            instance.description = validated_data['description']
        if 'star_rating' in validated_data:    
            instance.star_rating = validated_data['star_rating']
        if 'likes' in validated_data:
            instance.likes = validated_data['likes']
        if 'favourited' in validated_data:
            instance.favourited = validated_data['favourited']
        if 'star_rating' in validated_data:
            instance.star_rating = validated_data['star_rating']
        if 'prep_time' in validated_data:
            instance.prep_time = validated_data['prep_time']
        if 'cook_time' in validated_data:
            instance.cook_time = validated_data['cook_time']
        if 'servings' in validated_data:
            instance.servings = validated_data['servings']
        if 'cuisine' in validated_data:
            instance.cuisine = validated_data['cuisine']

        instance.save()
        return instance    

    def get_ingredients(self, instance):
        return collect_ingredients(instance)
    
    def get_steps(self, instance):
        steps = {}
        for step in instance.steps.all().order_by('step_num'):
            steps[f"{step.step_num}"] = step.description
        return steps
    
    def get_images(self, instance):
        images = {}
        for image in instance.images.all():
            images[f"{image.id}"] = image.image.url
        return images
    
    def get_diets(self, instance):
        diets = []
        for diet in instance.diets.all():
            diets.append(str(diet))
        return diets

    def get_videos(self, instance):
        videos = {}
        for video in instance.videos.all():
            videos[f"{video.id}"] = video.video.url
        return videos
    
    def get_comments(self,instance):
        comments = {}
        for comment in instance.comments.all():
            curr_comment = {}
            curr_comment["description"] = comment.description
            curr_comment["images"] = self.get_images(comment)
            curr_comment["videos"] = self.get_videos(comment)
            comments[f'{comment.id}'] = curr_comment
        return comments

    def to_representation(self, instance):
        orig_rep = super().to_representation(instance)
        rep = {
            'recipe_details': orig_rep,
            'ingredients': self.get_ingredients(instance),
            'instructions': self.get_steps(instance),
            'images': self.get_images(instance),
            'comments': self.get_comments(instance)
        }
        return rep

class LikeRecipeSerializer(serializers.ModelSerializer):
    likes = serializers.ReadOnlyField()
    class Meta:
        model = Recipe
        fields = ['likes']
    
    def update(self, instance, validated_data):
        instance.likes += 1
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.likes -= 1
        instance.save()
        return instance

class FavRecipeSerializer(serializers.ModelSerializer):
    favourited = serializers.ReadOnlyField()
    class Meta:
        model = Recipe
        fields = ['favourited']

    def update(self, instance, validated_data):
        instance.favourited += 1
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.favourited -= 1
        instance.save()
        return instance
        
class RecipeImageSerializer(serializers.ModelSerializer):
    recipe = serializers.CharField(source='recipe.id', read_only=True)
    class Meta:
        model = RecipeImage
        fields = ['id', 'image', 'recipe', 'image_url']
    
    def create(self, validated_data):
        recipe_id = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe_id)
        return super().create(validated_data | {'recipe': recipe})

class RecipeCommentSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    recipe = serializers.CharField(source='recipe.id', read_only=True)
    class Meta:
        model = RecipeComment
        fields = ['id', 'description','owner', 'recipe']
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'owner': self.context['request'].user, 'recipe': recipe})

class RecipeCommentImageSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source='comment.id', read_only=True)
    class Meta:
        model = RecipeCommentImage
        fields = ['id', 'comment', 'image']
    
    def create(self, validated_data):
        comment = self.context['request'].parser_context['kwargs']['comment_id']
        comment = get_object_or_404(RecipeComment, pk=comment)
        return super().create(validated_data | {'comment': comment})

class RecipeCommentVideoSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source='comment.id', read_only=True)
    class Meta:
        model = RecipeCommentVideo
        fields = ['id', 'comment', 'video']
    
    def create(self, validated_data):
        comment = self.context['request'].parser_context['kwargs']['comment_id']
        comment = get_object_or_404(RecipeComment, pk=comment)
        return super().create(validated_data | {'comment': comment})

class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['id', 'description', 'date_created', 'step_num']

    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'recipe': recipe})
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.id != instance.recipe.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        if 'description' in validated_data:
            instance.description = validated_data['description']
        if 'step_num' in validated_data:
            instance.step_num = validated_data['step_num']
        if validated_data:
            instance.date_created = datetime.now()
        
        instance.save()
        return instance

class RecipeIngredientSerializer(serializers.ModelSerializer):
    # replace w/ "RecipeSerializer()" for more info
    recipe = serializers.CharField(source='recipe.name', read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe', 'name', 'quantity']
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'recipe': recipe})
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.recipe.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        if 'name' in validated_data:
            instance.description = validated_data['name']
        if 'quantity' in validated_data:
            instance.step_num = validated_data['quantity']
        instance.save()
        return instance

class ShopListRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = '__all__'

    def to_representation(self, instance):
        """
        Note: <instance> is the ShoppingLst object
        """
        orig_rep = super().to_representation(instance)
        orig_recipe = instance.original_recipe
        servings = orig_rep.get('serving', None)

        rep = {
            'recipe_name': orig_rep.get('name', None),
            'shoplstrecipe_id': orig_rep.get('id', None),
            'servings': orig_rep.get('serving', None),
            'orig_id': orig_rep.get('original_recipe', None),
            'ingredients': collect_ingredients_x(orig_recipe, servings),
            'pic_rep': get_pic_rep(orig_recipe),
            'cook_time': orig_recipe.cook_time
        }

        return rep
    
class ShoppingLstSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email')
    recipes = ShopListRecipeSerializer(source='shoplstrecipe_set', many=True)

    class Meta:
        model = ShoppingLst
        fields = '__all__'

    def get_total_ingredients(self, instance):
        all_ingredients = {}
        for recipe in ShopLstRecipe.objects.filter(lst=instance):
            original_recipe = recipe.original_recipe
            recipe_ingredients = collect_ingredients_x(original_recipe, recipe.serving)
            for name, amount in recipe_ingredients.items():
                if amount: quantity = amount.split()[QUANTITY]
                else: quantity = 0

                # The specified ingredient has already been
                # adjusted based on its number of servings
                # So, just pass in 1 as <servings>.
                all_ingredients = assign_ingredient(name, quantity,
                                                    all_ingredients, 
                                                    1)
        return all_ingredients

    def to_representation(self, instance):
        """
        Note: <instance> is the ShoppingLst object
        """
        orig_rep = super().to_representation(instance)

        rep = {
            'shop_lst_id': instance.id,
            'shop_lst_owner': orig_rep.get('owner', None),
            'recipes_details': orig_rep.get('recipes', None),
            'total_ingredients': self.get_total_ingredients(instance),
        }

        return rep

class ShopListRecipeAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = ['id', 'original_recipe', 'serving']

    def create(self, validated_data):
        if 'original_recipe' in validated_data:
            recipe = validated_data.get('original_recipe', '')
            servings = validated_data.get('serving', recipe.servings)
            instance = ShopLstRecipe.objects.create(original_recipe=recipe, 
                                                    lst=get_object_or_404(ShoppingLst, 
                                                                          owner=self.context['request'].user),
                                                    recipe_owner=recipe.owner, name=recipe.name,
                                                    serving=servings)
            return instance

class ShopListEditRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = ['serving']

class ShopListDeleteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
