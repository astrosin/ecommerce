from django.urls import path, include,re_path
from .views import GithubLogin, FacebookLogin, CustomRegisterView, UserProfileView,CustomLoginView,FileView,Files_APIView,Files_GetView_Detail,Files_PutView_Detail,Files_DeleteView_Detail
from rest_auth.registration.views import VerifyEmailView, RegisterView
from .views import OrderItemPostView,OrderItemGetView,UserOrderPostView,UserOrderGetView,CartPostView,CartGetView,HistoryPostView,HistoryGetView,User_APIView

urlpatterns = [
    path('register/', CustomRegisterView.as_view()),
    path('login1/', CustomLoginView.as_view()),
    path('github/', GithubLogin.as_view(), name='github_auth'),
    path('facebook/', FacebookLogin.as_view(), name='github_auth'),
    path('user/<pk>/', UserProfileView.as_view()),
    path('', include('rest_auth.urls')),
    
    #get_alluser
    path('get/all_user',User_APIView.as_view()),

    # File 
    path('post/file',FileView.as_view()),
    path('get/file', Files_APIView.as_view()), 
    path('get/fileget/<int:pk>', Files_GetView_Detail.as_view()),
    path('get/fileput/<int:pk>', Files_PutView_Detail.as_view()),
    path('get/filedelete/<int:pk>', Files_DeleteView_Detail.as_view()),

    # path('user/<pk>/profile/list', UserProfileListView.as_view())
    path('registration/', RegisterView.as_view(), name='account_signup'),
    # order item adding fromn admin site
    path('admin/orderitem/post', OrderItemPostView.as_view(), name='account_signup'),
    path('admin/orderitem/get',OrderItemGetView.as_view()),
    #user ordering will add to table and reflect to admin
    path('user/ordered/item/post',UserOrderPostView.as_view()),
    path('user/ordered/item/get',UserOrderGetView.as_view()),
    #user will add to cart
    path('user/add/cart/post',CartPostView),
    path('user/add/cart/get',CartGetView),
    #order adding to history
    path('user/history/post',HistoryPostView),
    path('user/history/get',HistoryGetView),


    re_path('^account-confirm-email/', VerifyEmailView.as_view(),name='account_email_verification_sent'),
    re_path('^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),name='account_confirm_email'),
    path('^accounts/', include('allauth.urls')),

]
