import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-notificationsettings',
  templateUrl: './notificationsettings.page.html',
  styleUrls: ['./notificationsettings.page.scss'],
})
export class NotificationsettingsPage implements OnInit {

  constructor(private fun: FunctionsService, private menuCtrl: MenuController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }


}
