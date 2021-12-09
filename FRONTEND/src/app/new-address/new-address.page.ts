
import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { AuthServiceService,Address} from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

  address: Address = {
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    country: 'India',
    state: '',
    city: '',
    zipcode: undefined,
    phone_number: undefined
  }

  flag;

  countries: any;

  constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute, private fun: FunctionsService, private dataService: AuthServiceService, private http: HttpClient) {
    this.get();
    this.flag = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  get(){
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(d=>{
      this.countries = d;
    });
  }

  update(){
    if(this.address.first_name == ''
    || this.address.last_name == ''
    || this.address.address_line_1 == ''
    || this.address.city == ''
    || this.address.zipcode == undefined
    || this.address.phone_number == undefined){
      this.fun.presentToast('Wrong Input', true, 'top');
    }
    else{
      this.dataService.current_user.address.push(this.address);
      if(this.flag){
        this.fun.navigate('home',false);
      }
      else{
        this.fun.back();
      }
    }
  }
}
