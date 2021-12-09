from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import RegisterView
from rest_auth.views import LoginView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FileSerializer
from .serializers import FileListSerializer
from rest_framework import status, permissions
from django.http import Http404
from rest_framework.parsers import FileUploadParser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .permissions import IsOwnerOrReadOnly
from .serializers import CustomRegisterSerializer, UserProfileSerializer,CustomLoginSerializer,OrderItemSerializer,UserOrderSerializer,CartSerializer,HistorySerializer,UserSerializer
from .models import User,File,OrderItem,UserOrder,Cart,History
from rest_framework.decorators import api_view


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client


class CustomRegisterView(RegisterView):
    queryset = User.objects.all()
    serializer_class = CustomRegisterSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(self.get_response_data(user),
                        status=status.HTTP_201_CREATED,
                        headers=headers)
 

class CustomLoginView(LoginView):
    queryset = User.objects.all()
    serializer_class = CustomLoginSerializer

class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    # queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly, ]
    # Authorization : token tokennumber
    def get_queryset(self):
        pk = self.kwargs['pk']
        try:
            User.objects.get(pk=pk)
        except:
            content = {
                'status': 'User Does Not Exist'
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        return User.objects.all()

class FileView(APIView):
  #parser_classes = (MultiPartParser, FormParser)
  parser_class = (FileUploadParser,)
  def post(self, request, *args, **kwargs):
    # data = request.data
    # print(request.data)
    # data['account'] = 1
    # data['account']= User(mobile = self.request.data)
    # data = request.data
    # data['account']=User.objects.all().prefetch_related('account') 
    file_serializer = FileSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class User_APIView(APIView):
    #parser_class = (FileUploadParser, )
    #permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None, *args, **kwargs):
        file = User.objects.all()
        serializer = UserSerializer(file, many=True)
        return Response(serializer.data)

class Files_APIView(APIView):
    #parser_class = (FileUploadParser, )
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None, *args, **kwargs):
        file = File.objects.all()
        serializer = FileSerializer(file, many=True)
        return Response(serializer.data)

    """
        Post implementation #1
            - Save one file
            - Use FileSerializer
    """
    # def post(self, request, format=None):
    #     serializer = FileSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """
        Post implementation #2
            - Save multiple files
            - Use FileSerializer
            - Idea: https://docs.djangoproject.com/en/3.0/topics/http/file-uploads/#uploading-multiple-files
    """
    # def post(self, request, format=None):
    #     serializer = FileSerializer(data=request.data)
        
        
    
    """
        Post implementation #3
            - With error: AttributeError
            - Save multiple files
            - Use FileListSerializer
    """
    # def post(self, request, format=None):
    #     serializer = FileListSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class Files_GetView_Detail(APIView):
    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FileSerializer(file)  
        return Response(serializer.data)
        
class Files_PutView_Detail(APIView):
    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404           
    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FileSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Files_DeleteView_Detail(APIView):
    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404   
    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Controlling from admin

class OrderItemPostView(APIView):
  #parser_classes = (MultiPartParser, FormParser)
  parser_class = (FileUploadParser,)
  def post(self, request, *args, **kwargs):
    # data = request.data
    # print(request.data)
    # data['account'] = 1
    # data['account']= User(mobile = self.request.data)
    # data = request.data
    # data['account']=User.objects.all().prefetch_related('account') 
    file_serializer = OrderItemSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderItemGetView(APIView):
    #parser_class = (FileUploadParser, )
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None, *args, **kwargs):
        file = OrderItem.objects.all()
        serializer = OrderItemSerializer(file, many=True)
        return Response(serializer.data)




# user purchasing data

class UserOrderPostView(APIView):
  #parser_classes = (MultiPartParser, FormParser)
  parser_class = (FileUploadParser,)
  def post(self, request, *args, **kwargs):
    # data = request.data
    # print(request.data)
    # data['account'] = 1
    # data['account']= User(mobile = self.request.data)
    # data = request.data
    # data['account']=User.objects.all().prefetch_related('account') 
    file_serializer =UserOrderSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserOrderGetView(APIView):
    #parser_class = (FileUploadParser, )
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None, *args, **kwargs):
        file = UserOrder.objects.all()
        serializer = UserOrderSerializer(file, many=True)
        return Response(serializer.data)


# cart view

class CartPostView(APIView):
  #parser_classes = (MultiPartParser, FormParser)
  parser_class = (FileUploadParser,)
  def post(self, request, *args, **kwargs):
    # data = request.data
    # print(request.data)
    # data['account'] = 1
    # data['account']= User(mobile = self.request.data)
    # data = request.data
    # data['account']=User.objects.all().prefetch_related('account') 
    file_serializer =CartSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CartGetView(APIView):
    #parser_class = (FileUploadParser, )
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None, *args, **kwargs):
        file = Cart.objects.all()
        serializer = CartSerializer(file, many=True)
        return Response(serializer.data)

# History View

class HistoryPostView(APIView):
  #parser_classes = (MultiPartParser, FormParser)
  parser_class = (FileUploadParser,)
  def post(self, request, *args, **kwargs):
    # data = request.data
    # print(request.data)
    # data['account'] = 1
    # data['account']= User(mobile = self.request.data)
    # data = request.data
    # data['account']=User.objects.all().prefetch_related('account') 
    file_serializer =HistorySerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HistoryGetView(APIView):
    #parser_class = (FileUploadParser, )
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None, *args, **kwargs):
        file = History.objects.all()
        serializer = HistorySerializer(file, many=True)
        return Response(serializer.data)