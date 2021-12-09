import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Router,NavigationExtras } from '@angular/router';

interface LooseObject {
  id:number ,
  item_name:string,
  img_file:string,
  order:number,
  price:string,
  expalanation:string
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {
 
  admin_data:LooseObject;
  data_id;
  id_number;
  constructor(private route: ActivatedRoute,private auth:AuthServiceService,public router:Router) {
    this.route.queryParams.subscribe(params => {
      this.admin_data=JSON.parse(params["MessageDetails"]);
      this.auth.getting_id().subscribe(res=>{
        this.data_id=<any>res
        this.admin_data['order']=this.data_id.id
        console.log(this.data_id.id)
       },err=>{
        console.log(err)
       });
      console.log('data',this.admin_data);
      });
  }
  ionViewDidEnter(){
   
}
  ngOnInit() {
  }
  buyNow(){
    this.auth.postordertoadmin(this.admin_data).subscribe(res=>{
       console.log(res)
       this.router.navigateByUrl('thnaksordering');
    },err=>{
       console .log(err)
    })
    

  }
}
