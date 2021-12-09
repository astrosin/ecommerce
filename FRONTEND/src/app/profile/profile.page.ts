import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../auth-service.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
data:any;
name;
email;
mobile;
address;
  constructor(public authenticationService:AuthServiceService) {
  }
  ionViewDidEnter(){
    this.authenticationService.user().subscribe(res=>{
      this.data=res;
      this.name=this.data.name;
      this.email=this.data.email;
      this.mobile=this.data.mobile;
      this.address=this.data.address;
    })
    }
  ngOnInit() {
  }
}
