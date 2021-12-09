
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { AuthServiceService,Orders } from '../auth-service.service';
import { OrderinfoPage } from '../orderinfo/orderinfo.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: Array<Orders>;

  constructor(private menuCtrl: MenuController,public router:Router, private modalController: ModalController, private fun: FunctionsService, private dataService: AuthServiceService) {
    this.orders = dataService.orders;
  }

  ngOnInit() {
  }
  move_to_cart(){
    this.router.navigate(['cart'])
    }
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  async open(order: Orders){
    let modal = await this.modalController.create({
      component: OrderinfoPage,
      componentProps: { value: order }
    });
    return await modal.present();
  }

}
