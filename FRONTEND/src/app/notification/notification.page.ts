import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeTab, AuthServiceService, Notification } from '../auth-service.service';
import { IonSlides, MenuController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  @ViewChild('Slides') slides: IonSlides;
  index = 0;
  segment = '';
  notifications: Notification;

  data: Array<HomeTab> = [];

  constructor(private dataService: AuthServiceService,private fun:FunctionsService, public router:Router,private menuCtrl: MenuController) {
    this.data = dataService.notifications_tab;
    this.segment = this.data[0].title;
    this.notifications = dataService.notifications;
  }

  ngOnInit() {
  }
  // move_to_cart(){
  //   this.router.navigate(['cart'])
  // }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  async change() {
    await this.slides.getActiveIndex().then(d => this.index = d);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  update(i) {
    this.slides.slideTo(i);
  }

  drag() {
    // var element : any = document.getElementsByClassName('my-btn')[this.index + 1];
    document.getElementById('dag').scrollLeft = this.index * 150;
  }

  seg(event) {
    this.segment = event.detail.value;
  }


}
