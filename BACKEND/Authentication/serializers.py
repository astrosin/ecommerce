from .models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import force_text
from rest_framework import serializers, exceptions
from rest_framework.exceptions import ValidationError
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import (email_address_exists,
                               get_username_max_length)
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
    from allauth.socialaccount.helpers import complete_social_login
    from allauth.socialaccount.models import SocialAccount
    from allauth.socialaccount.providers.base import AuthProcess
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

from rest_framework import serializers
from requests.exceptions import HTTPError

from rest_framework import serializers
from .models import File,OrderItem,UserOrder,Cart,History

# Get the UserModel
class RegisterSerializer(serializers.Serializer):
    name=serializers.CharField(required=True)
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    mobile  = serializers.CharField(required=False)
    address=serializers.CharField(required=False)
            
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if True:
            if email and email_address_exists(email) :
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(_("The two password fields didn't match."))
        if User.objects.filter(mobile=data['mobile']).exists():
                    raise serializers.ValidationError(_("Phone number already exists."))
        return data

    def custom_signup(self, request, user):
             user.name=self.validated_data.get('name','')
             user.mobile = self.validated_data.get('mobile', '')
             user.address=self.validated_data.get('address','')
             user.save(update_fields=['name','mobile','address'])
    

    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
class CustomRegisterSerializer(RegisterSerializer):
    
    class Meta:
        model = User
        fields = '__all__'

    # def save(self, request):
    #     return user

class LoginSerializer(serializers.Serializer):
    mobile = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_mobile(self, mobile, password):
        user = None

        if mobile and password:
            user = self.authenticate(mobile=mobile, password=password)
        else:
            msg = _('Must include "mobile" and "password".')
            raise exceptions.ValidationError(msg)
        return user

    def validate(self, attrs):
        mobile = attrs.get('mobile')
        password = attrs.get('password')

        user = None

        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            user = self._validate_mobile(mobile, password)

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        # If required, is the email verified?
        # if 'rest_auth.registration' in settings.INSTALLED_APPS:
        #     from allauth.account import app_settings
        #     if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
        #         email_address = user.emailaddress_set.get(email=user.email)
        #         if not email_address.verified:
        #             raise serializers.ValidationError(_('E-mail is not verified.'))

        attrs['user'] = user
        return attrs

class CustomLoginSerializer(LoginSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar', 'about', 'email','mobile','address', 'name', 'id', 'joined_date')
        read_only_fields = ['email', 'name', 'mobile','address','id', 'joined_date']

    def validate(self, data):
        about = data.get('about', None)
        avatar = data.get('avatar', None)

        if about == '':
            about = None
        if avatar is None and about is None:
            raise ValueError('that is not correct eh')
        return data

class FileListSerializer(serializers.Serializer) :
    name = serializers.CharField(max_length=50)
    one_file = serializers.ListField(
                       child=serializers.FileField( max_length=100000,
                                         allow_empty_file=False,
                                         use_url=False )
                                )
    remark = serializers.CharField(max_length=20)
    def create(self, validated_data):
        name=validated_data.pop('name')
        one_file=validated_data.pop('one_file')
        remark=validated_data.pop('remark')
        for file in one_file:
            f = File.objects.create(name=name, one_file=file, remark=remark,**validated_data)
        return f
class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model=User
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    img_file=serializers.FileField(required=True)
    class Meta():
        model = File
        fields = ['description','one_file','account']
    def to_representation(self, instance):
        self.fields['account'] =  CustomRegisterSerializer(read_only=True)
        return super(FileSerializer, self).to_representation(instance)

# admin adding data
class OrderItemSerializer(serializers.ModelSerializer):

    class Meta():
        model = OrderItem
        fields = '__all__'

#adding to table after user order it
class UserOrderSerializer(serializers.ModelSerializer):
    class Meta():
        model = UserOrder
        fields = '__all__'
    def to_representation(self, instance):
        self.fields['order'] =  CustomRegisterSerializer(read_only=True)
        return super(UserOrderSerializer, self).to_representation(instance)

# user adding to cart
class CartSerializer(serializers.ModelSerializer):
    class Meta():
        model=Cart
        fields = '__all__'
    def to_representation(self, instance):
        self.fields['cart_username'] =  CustomRegisterSerializer(read_only=True)
        return super(CartSerializer, self).to_representation(instance)
# History
class HistorySerializer(serializers.ModelSerializer):
    class Meta():
        model=History
        fields = '__all__'
    def to_representation(self, instance):
        self.fields['history_username'] =  CustomRegisterSerializer(read_only=True)
        return super(HistorySerializer, self).to_representation(instance)
