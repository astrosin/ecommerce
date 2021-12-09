import { Component, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { FunctionsService } from '../functions.service';
import {  HomeTab } from '../auth-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
})
export class HomeViewPage  {
  @ViewChild('Slides') slides: IonSlides;

  segment = '';
  index = 0;
  data: Array<HomeTab> = [];
  sponsored: Array<any> = [];
  // product_data_1: Array<Product> = [];
  // product_data_2: Array<Product> = [];
  // product_data_3: Array<Product> = [];
  // product_data_4: Array<Product> = [];
  // product_data_5: Array<Product> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: AuthServiceService,private ss:SharedService ,public router:Router) {
    this.ss.change_true();
    this.sponsored = this.dataService.sponsored;
    // const d = this.activatedRoute.snapshot.paramMap.get('id');
    // if (d) {
    //   this.segment = this.data[parseInt(d, 10)].title;
    // } else {
    //   this.segment = this.data[0].title;
    // }
  } 
  ngOnInit()  {
    
  }
  
  

  move_to_cart(){
  this.router.navigate(['cart'])
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    // this.menuCtrl.enable(true, 'end');
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  drag() {
    let distanceToScroll = 0;
    for (let index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  // side_open() {
  //   this.menuCtrl.toggle('end');
  // }

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }

}
