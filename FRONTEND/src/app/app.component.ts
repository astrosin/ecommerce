import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthServiceService } from './auth-service.service';
import { FunctionsService } from './functions.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, IonSlides } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  side_open = false;
  side_open1 = false;

  public appPages = [
    { title: 'Browse', url: '/home-view', icon: 'home' },
    // { title: 'Search', url: '/search', modal: true, icon: 'search' },
    { title: 'Your orders', url: '/notification', icon: 'notifications' },
    { title: 'Shopping Cart', url: '/cart', icon: 'cart' },
    { title: 'Order History', url: '/orders', icon: 'list' },
    // { title: 'Wish Cash', url: '/wishcash', icon: 'wallet' },
    // { title: 'Rewards', url: '/rewards', icon: 'trophy' },
    { title: 'Apply Promo', url: '/applypromo', icon: 'megaphone' }
  ];
  public appPages1 = [
    { title: 'Customer Support', url: '/support', icon: 'people' },
    { title: 'FAQs', url: '/faqs', icon: 'help-circle' },
    { title: 'Settings', url: '/settings', icon: 'cog' }
  ];

  colors = [
    'Bronze',
    'Black',
    'Blue',
    'Clear',
    'Gold',
    'Gray',
    'Green',
    'Multi-Color',
    'Orange',
    'Pink',
    'Red',
    'Silver',
    'White',
    'Yellow',
    'Brown',
    'Purple',
    'Beige'
  ];

  menu(b){
    if(b){
      this.side_open = false;
      this.side_open1 = true;
    }
    else {
      this.side_open = false;
      this.side_open1 = false;
    }
  }

  back(){
    this.side_open = true;
  }
 
  subscription;
  onMain: Boolean=false;
  user;
  name;
  data;
  constructor(
    private platform: Platform,
    private statusBar:StatusBar,
    public dataService: AuthServiceService,
    public fun: FunctionsService,ss: SharedService,
    private router: Router,
    private storage: Storage,
  ) {
    this.onMain = true;
    this.initializeApp();
    this.subscription = ss.getEmittedValue().subscribe(item => this.onMain=item);
    this.dataService.user1();
    }
    

 
ionViewDidEnter(){
 
}
  initializeApp() {
    this.platform.ready().then(() => {
      //  this.statusBar.styleDefault();
      
      // this.splashScreen.hide();
    });
    
  }
  profile(){
    this.router.navigate(['profile']);
  }
    
}
