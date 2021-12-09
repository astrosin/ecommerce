import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service'; 

@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.page.html',
  styleUrls: ['./changeemail.page.scss'],
})
export class ChangeemailPage implements OnInit {

  constructor(public fun: FunctionsService, private menuCtrl: MenuController, public dataService: AuthServiceService) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }


}
