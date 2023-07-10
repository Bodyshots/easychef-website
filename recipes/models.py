from django.db import models
from django.db.models import CASCADE
from django.conf import settings
from django.core.validators import MaxValueValidator, FileExtensionValidator, MinValueValidator
from multiselectfield import MultiSelectField

# Side note:
# GenericRelation seems good to look at
# See https://stackoverflow.com/questions/47707377/django-order-objects-based-on-likes-for-popular-feed
# from django.contrib.contenttypes.fields import GenericRelation

class Diets(models.TextChoices):
    VEGAN = 'VE', 'Vegan'
    HALAL = 'HA', 'Halal'

class RecipeDiet(models.Model):

    diet = models.CharField(max_length=2, choices=Diets.choices, unique=True)

    def __str__(self):
        return self.diet

class Recipe(models.Model):
    class CookingTimeTags(models.TextChoices):
        ONEHR = '1HR', 'About one hour or less'
        TWOHRS = '2HRS', 'About two hours or less'
        THREEHRS = '3HRS', 'More than three hours'
    class Cuisines(models.TextChoices):
        DUTCH = 'DU', 'Dutch'
        THAI = 'TH', 'Thai'
        WELSH = 'WE', 'Welsh'
        ARAB = 'AR', 'Arabic'

    owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=CASCADE, related_name='myrecipes')
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)  # TextField - allows for > 255 chars
    star_rating = models.DecimalField(decimal_places=2, max_digits=3, validators=[MinValueValidator(1),
        MaxValueValidator(5)], default=0)  # not FloatField: see https://docs.python.org/3/library/decimal.html#module-decimal
    likes = models.PositiveIntegerField(default=0)  # could be BigInteger too, but the range of the Integer is very large already
    cookingtimetag = models.CharField(max_length=7, choices=CookingTimeTags.choices, blank=True)
    cuisine = models.CharField(max_length=7, choices=Cuisines.choices, blank=True)
    diets = MultiSelectField(choices=Diets.choices, blank=True, max_length=5, max_choices=2)
    favourited = models.PositiveIntegerField(default=0, editable=False)

    prep_time = models.TimeField()  # Replace w/ TimeField(?)
    cook_time = models.TimeField()  # Replace w/ TimeField(?)
    servings = models.PositiveIntegerField()

    def __str__(self):
        return f"({self.id}) {self.name}"

class ShoppingLst(models.Model):
    owner = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=CASCADE)

    def __str__(self):
        return f"({self.id}) {self.owner}'s Shopping List"
    
class ShopLstRecipe(models.Model):
    original_recipe = models.ForeignKey(to=Recipe, on_delete=CASCADE)
    lst = models.ForeignKey(to=ShoppingLst, on_delete=CASCADE)

    recipe_owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=CASCADE, related_name='recipe_owner')
    name = models.CharField(max_length=255)
    serving = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"({self.id}) {self.name}"

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=CASCADE, related_name='ingredients')
    name = models.CharField(max_length=255)
    quantity = models.DecimalField(decimal_places=2, max_digits=4,validators=[MinValueValidator(0)], 
                                      default=1)

    def __str__(self):
        return f"({self.id}) {self.quantity} {self.name} g"

class RecipeImage(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=CASCADE, related_name='images')
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return f"({self.id}) {self.image.file}"
   
    def media_url(self):
        return f"http://127.0.0.1:8000{self.image.url}"

class RecipeStep(models.Model):
    description = models.TextField()
    recipe = models.ForeignKey(to=Recipe, on_delete=CASCADE, related_name="steps")
    date_created = models.DateTimeField(auto_now=True)
    step_num = models.PositiveIntegerField()

    def __str__(self):
        return f"({self.recipe.name}) {self.step_num}. {self.description}"

class RecipeComment(models.Model):
    owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=CASCADE)
    description = models.TextField()
    recipe = models.ForeignKey(to=Recipe, on_delete=CASCADE, related_name="comments")
    
    def __str__(self):
        return f"({self.id}) {self.owner.email}'s comment on {self.recipe.name}: {self.description}"

class RecipeCommentImage(models.Model):
    comment = models.ForeignKey(to=RecipeComment, on_delete=CASCADE, related_name='images')
    image = models.ImageField(upload_to="commentimages/")

    def __str__(self):
        return f"({self.id}) {self.image.file}"

class RecipeCommentVideo(models.Model):
    comment = models.ForeignKey(to=RecipeComment, on_delete=CASCADE, related_name='videos')
    video = models.FileField(upload_to="commentvideos/",
                             validators=[
                                 FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])

    def __str__(self):
        return f"({self.id}) {self.video.file}"
