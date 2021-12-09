import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceService,Product } from '../auth-service.service';
import { FunctionsService } from '../functions.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-innerhome',
  templateUrl: './innerhome.component.html',
  styleUrls: ['./innerhome.component.scss'],
})
export class InnerhomeComponent implements OnInit {

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
