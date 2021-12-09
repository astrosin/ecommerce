import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-thnaksordering',
  templateUrl: './thnaksordering.page.html',
  styleUrls: ['./thnaksordering.page.scss'],
})
export class ThnaksorderingPage implements OnInit {
  data;
  mobile;
  address;
  constructor(private auth:AuthServiceService) { }

  ionViewDidEnter(){
    this.auth.user().subscribe(res=>{
      this.data=res
      this.mobile=this.data.mobile
      this.address=this.data.address
     }
      ,err=>{
      console.log(err)
    });
 }
  ngOnInit() {
     
  }

}
