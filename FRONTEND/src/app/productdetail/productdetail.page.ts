
import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { AuthServiceService, Product, HomeTab } from '../auth-service.service';
import { IonSlides, MenuController, NavController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  @ViewChild('Slides') slides: IonSlides;
  @ViewChild('Content') content: IonContent;
  @ViewChild('slider') slider: IonSlides;

  index = 0;
  segment = '';
  slideOpts = {
    effect: 'flip',
    zoom: false
  };

  data: Array<HomeTab> = [];

  product: Product;

  constructor(
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: AuthServiceService,
    private nav: NavController) {

    this.product = dataService.current_product;
    this.data = dataService.item_tab;
    this.segment = this.data[0].title;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    // this.menuCtrl.enable(false, 'end');
  }

  async change() {
    await this.slides.getActiveIndex().then(d => this.index = d);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  onReviewClick(index) {
    this.segment = this.data[index].title;
    this.index = index;
    this.slides.slideTo(index);
    this.content.scrollToTop();
    this.drag();

  }

  goToCart() {
    this.fun.navigate('cart', false);
  }
  goToCheckout(){
    this.fun.navigate('checkout',false);
  }

  update(i) {
    this.slides.slideTo(i);
  }

  drag() {
    let distanceToScroll = 0;
    for (const index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  seg(event) {
    this.segment = event.detail.value;
  }

}
