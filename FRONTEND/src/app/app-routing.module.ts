import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  
  {
    path: 'getuser',
    loadChildren: () => import('./getuser/getuser.module').then( m => m.GetuserPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'gallery',

    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'fileupload',

    loadChildren: () => import('./fileupload/fileupload.module').then( m => m.FileuploadPageModule)
  },
  {
    path: 'profile',
    
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'thnaksordering',
    loadChildren: () => import('./thnaksordering/thnaksordering.module').then( m => m.ThnaksorderingPageModule)
  },
  {
    path: 'home-view',
    loadChildren: () => import('./home-view/home-view.module').then( m => m.HomeViewPageModule)
  },
  {
    path: 'productlist',
    loadChildren: () => import('./productlist/productlist.module').then( m => m.ProductlistPageModule)
  },
  {
    path: 'productdetail',
    loadChildren: () => import('./productdetail/productdetail.module').then( m => m.ProductdetailPageModule)
  },
  {
    path: 'infomodal',
    loadChildren: () => import('./infomodal/infomodal.module').then( m => m.InfomodalPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'applypromo',
    loadChildren: () => import('./applypromo/applypromo.module').then( m => m.ApplypromoPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'orderinfo',
    loadChildren: () => import('./orderinfo/orderinfo.module').then( m => m.OrderinfoPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'addressbook',
    loadChildren: () => import('./addressbook/addressbook.module').then( m => m.AddressbookPageModule)
  },
  {
    path: 'NewAddress/:id',
    loadChildren: () => import('./new-address/new-address.module').then( m => m.NewAddressPageModule)
  },
  {
    path: 'notificationsettings',
    loadChildren: () => import('./notificationsettings/notificationsettings.module').then( m => m.NotificationsettingsPageModule)
  },
  {
    path: 'emailsettings',
    loadChildren: () => import('./emailsettings/emailsettings.module').then( m => m.EmailsettingsPageModule)
  },
  {
    path: 'accountsettings',
    loadChildren: () => import('./accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
  },
  {
    path: 'changeemail',
    loadChildren: () => import('./changeemail/changeemail.module').then( m => m.ChangeemailPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
