from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import CASCADE
from phonenumber_field.modelfields import PhoneNumberField

from recipes.models import Recipe, ShoppingLst # might not be the correct import

# Create your models here.

# UserManager code taken from https://testdriven.io/blog/django-custom-user-model/
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email=self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """
    From https://stackoverflow.com/questions/21514354/difference-between-abstractuser-and-abstractbaseuser-in-django
    AbstractBaseUser initially contains these fields:
    - id
    - password
    - last_login

    Missing initially (from AbstractUser)
    - is_superuser
    - username (Special, Unique Constraint)
    - first_name
    - last_name
    - email (Special)
    - is_staff
    - is_active
    - date_joined
    """
    email = models.EmailField(unique=True) # "username" = email
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    avatar = models.ImageField("", upload_to="avatarimages/", height_field=None, # Should have a default, if not specified
                                   width_field=None, max_length=None, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # Read: https://django-phonenumber-field.readthedocs.io/en/latest/
    phone_number = PhoneNumberField(null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    last_login = models.DateTimeField(auto_now=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # For Search: Possibly let a recipe have a favourited field that is
    # incremented every time it's favourited by a user?
    # (see post_save()?)
    favourites = models.ManyToManyField(Recipe, blank=True, related_name="favourites")

    #Field for adding favourite recipes
    fav_id = models.IntegerField(null=True, blank=True)

    rated = models.ManyToManyField(Recipe, blank=True, related_name="rater")
    likes = models.ManyToManyField(Recipe, blank=True, related_name="liker")
    commented = models.ManyToManyField(Recipe, blank=True, related_name="commenter")


    USERNAME_FIELD = 'email' # Assuming 1 email per user. Can't be in req fields else error
    REQUIRED_FIELDS = ['password']
    ordering = ('email',)
    objects = UserManager()

    def __str__(self):
        return self.email
    
    # Majority of code for overriding save taken from 
    # https://stackoverflow.com/questions/52196365/django-automatically-create-a-model-instance-when-another-model-instance-is-cr
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            ShoppingLst.objects.create(owner=self)
