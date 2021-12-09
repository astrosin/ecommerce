import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {  ModalController } from '@ionic/angular';
import { ProductModelComponent } from '../product-model/product-model.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {
  productList:Array<any>;
  data
  value;
  constructor(
    private adminService: AdminService,
    private modalCtrl: ModalController
  ) {  }
  
  ngOnInit() {
    this.findAllProducts();
  }

  ionViewWillEnter() {
    this.adminService.findAllProducts().subscribe(res => {
      this.data=res;
      for(let i=0;i<this.data.length;i++){
        this.data[i].img_file="http://127.0.0.1:8000"+this.data[i].img_file
      }
      console.log(this.data);
    //  this.productList = data;
     });
  }
  findAllProducts() {
     this.adminService.findAllProducts().subscribe(res => {
      this.data=res;
      for(let i=0;i<this.data.length;i++){
        this.data[i].img_file="http://127.0.0.1:8000"+this.data[i].img_file
      }
      console.log(this.data);
    //  this.productList = data;
     });
  }
  async prouductAdModal(){
    
  }
  async presentModal(item) {
    console.log(item)
    const modal = await this.modalCtrl.create({
      component: ProductModelComponent,
      componentProps: {
        'selectedProduct': item
      }
    });
    modal.onWillDismiss().then((params) => {
      this.findAllProducts();
    });
    return await modal.present();
  }

  saveProduct(params) {
    const { createdProduct, editedProduct, success, deleted } = params.data;
    if (success !== true) {
      return;
    }
    if (createdProduct) {
      this.productList.push(createdProduct);
      return;
    } 
    let itemIndex = this.productList.findIndex(item => item.id == editedProduct.id);
    if(itemIndex === -1) {
      return;
    }
    if (deleted === true) {
      this.productList.splice(itemIndex, 1);
    } else {
      this.productList[itemIndex] = editedProduct;
    }
  }

}
