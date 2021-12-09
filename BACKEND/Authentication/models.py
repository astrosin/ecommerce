from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    '''creates new user instance'''
    def create_user(self, mobile, password=None, **extra_fields):
        if not mobile:
            raise ValueError('User should have an Email, or Create One')

        user = self.model(mobile=mobile, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    '''Creates A super User'''
    def create_superuser(self, mobile, password=None, **extra_fields):
        if not mobile:
            raise ValueError('User should have an mobile, or Create One')

        user = self.model(mobile=mobile, **extra_fields)
        user.set_password(password)
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    mobile=models.CharField(max_length=200,unique=True, verbose_name='mobile')
    name=models.CharField(max_length=20, verbose_name='name')
    email = models.EmailField(max_length=254, unique=True, verbose_name='email adress')
    name = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    avatar = models.ImageField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    joined_date = models.DateField(auto_now_add=True)
    address=models.CharField(null=True,max_length=250)

    objects = UserManager()
    USERNAME_FIELD = 'mobile'
    
    def __str__(self):
        return self.mobile

    @property
    def is_staff(self):
        return self.admin

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class File(models.Model):
    account=models.ForeignKey(User, related_name="account",null=True,on_delete=models.CASCADE)
    description= models.CharField(max_length=20, null=False, blank=True)
    one_file= models.FileField(upload_to="files", null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=True)
    def __str__(self):
         return self.one_file

# admin control
class OrderItem(models.Model):
    # order_username=models.ForeignKey(User, related_name="order_username",null=True,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=20, null=False, blank=True)
    img_file=models.FileField(upload_to="files", null=False, blank=False)
    price=models.CharField(max_length=20, null=False, blank=True)
    explanation=models.CharField(max_length=100,null=False,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=True)
    def __str__(self):
        return self.item_name
        
# ordered item storing and reflect to admin

class UserOrder(models.Model):
    order=models.ForeignKey(User, related_name="order",null=True,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=20, null=False, blank=True)
    img_file=models.CharField(max_length=200,null=False, blank=False)
    price=models.CharField(max_length=20, null=False, blank=False)
    explanation=models.CharField(max_length=100,null=False,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=True)
    def __str__(self):
        return self.item_name

# adding item to cart
class Cart(models.Model):
    cart_username=models.ForeignKey(User, related_name="cart_username",null=True,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=20, null=False, blank=True)
    img_file=models.CharField(max_length=200,null=False, blank=False)
    price=models.CharField(max_length=20, null=False, blank=False)
    explanation=models.CharField(max_length=100,null=False,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=True)
    def __str__(self):
        return self.item_name

#history of ordered item 
class History(models.Model):
    history_username=models.ForeignKey(User, related_name="history_username",null=True,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=20, null=False, blank=True)
    img_file=models.CharField(max_length=200,null=False, blank=False)
    price=models.CharField(max_length=20, null=False, blank=False)
    explanation=models.CharField(max_length=100,null=False,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=True)
    def __str__(self):
        return  self.item_name
