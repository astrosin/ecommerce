import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
import { MenuController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
data;
count_cart=0;
  constructor(public route:Router,public authenticationService:AuthServiceService,private menuCtrl: MenuController) {
    
  }
  
  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start'); 
}
  file_upload(){
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.route.navigate(['fileupload']);
      }
    }); 
  }
  
  profile(){
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.route.navigate(['profile']);
      }
    });
  }
  products(){
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.route.navigate(['list']);
      }
    });
  }
  cart(){
        this.route.navigate(['cart'])
      
  }
  logout(){
    this.authenticationService.logout();
  }
}
