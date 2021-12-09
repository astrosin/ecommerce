import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../auth-service.service';
import { FunctionsService } from '../functions.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  @Input() recieved_data: Array<Product>;

  constructor(private fun: FunctionsService, private nav: NavController) {
  }

  ngOnInit() {
  }

  open(data){
    this.fun.update(data);
    this.nav.navigateForward('/productdetail');
  }

}
