from recipes.models import RecipeIngredient, RecipeImage

QUANTITY = 0
DECIMAL_PLACES = 2

def assign_ingredient(name, quantity, ingredients, servings):
    # See if <name> exists in our collected ingredients so far
    existing_ingredient = ingredients.get(name, 0)

    # If <name> exists, add on to its current total
    # Curr_ingredient would be, for instance "850.0 g"
    if existing_ingredient:
        existing_ingredient = existing_ingredient.split()
        ingredients[name] = (str(round(float(existing_ingredient[QUANTITY]) + float(quantity) * servings, DECIMAL_PLACES))) + " g"
    # Otherwise, make a new entry for the ingredient w/
    # name <name> and quantity <quantity>
    else:
        ingredients[name] = str(round(float(quantity) * servings, DECIMAL_PLACES)) + " g"
    return ingredients

def add_ingredient(ingredients, ingredient, servings):
    return assign_ingredient(ingredient.name, ingredient.quantity, ingredients, servings)

def collect_ingredients_x(recipe, servings):
    ingredients = {}
    # Iterate through every ingredient belonging to <recipe>
    for ingredient in RecipeIngredient.objects.filter(recipe=recipe):
        ingredients = add_ingredient(ingredients, ingredient, servings)
    return ingredients

def collect_ingredients(recipe):
    return collect_ingredients_x(recipe, recipe.servings)

def get_pic_rep(recipe):
    recipe_imgs = list(RecipeImage.objects.filter(recipe=recipe))
    if (recipe_imgs != []): return recipe_imgs[0].media_url()
    else: return None
