import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  admin_data
  filter_data
  hello

  constructor(public router:Router,public authenticationService:AuthServiceService){
  }
  ionViewDidEnter(){
      this.authenticationService.getadmindata().subscribe(res=>{
        for(let i=0;i<res.length;i++){
          res[i].img_file="http://127.0.0.1:8000"+res[i].img_file
        }
        this.admin_data=res
      })
}
  data_to_productview(id){
       for(let i=0;i<this.admin_data.length;i++){
          if(this.admin_data[i].id==id){
            let navigationExtras: NavigationExtras = {
              queryParams: {
              MessageDetails: JSON.stringify(this.admin_data[i])
              }
              };
              this.router.navigate(['product'],navigationExtras);
            }
        }
    }
    
 

  ngOnInit(){}


}
