from rest_framework import permissions

class LstOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        obj is a <ShopLstRecipe>
        """
        user = request.user
        if user == obj.lst.owner:
            return True
        return False
