import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { SharedService } from '../shared.service';

const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-getuser',
  templateUrl: './getuser.page.html',
  styleUrls: ['./getuser.page.scss'],
})

export class GetuserPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  data;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthServiceService,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private ss:SharedService,
    private storage: Storage,
  ) { 
   this.ss.change();
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'start');
    this.route.queryParams.subscribe(params => {
      this.data=JSON.parse(params["MessageDetails"]);
      });
      console.log(typeof this.data)

    this.validations_form = this.formBuilder.group({
      name:new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password1:new FormControl('',Validators.compose([
        Validators.required
      ])),
      password2:new FormControl('',Validators.compose([
        Validators.required
      ])),
      address:new FormControl('',Validators.compose([
        Validators.required
      ]))
    });

    /**
     * check login state
     */
    this.checkLoginState();
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    // this.menuCtrl.enable(true, 'end');
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password1': [
      { type: 'required', message: 'Password is required.' },
    ],
     'password2':[
      { type: 'required', message: 'Password is required.' },

    ],
    'address':[
      { type: 'required', message: 'address is required.' },

    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };

  onSubmitRegister(values){
    values.mobile=this.data;
    console.log(values)
    this.authenticationService.register(values).subscribe(
      res => { // hide loading
        // example return data 
        // res = { isSuccess: true, tokenKey: 'token-key', others: 'others..' }
        if (res.key) {
          console.log(res.key);			
          return this.storage.set(TOKEN_KEY, res.key).then(() => {
            this.router.navigate(["home-view"]);
            this.authenticationService.RegisterAlert();
            this.authenticationService.authenticationState.next(true);
          });
        } else {
          this.authenticationService.registerFailedAlert('Please register with valid data!');
          this.authenticationService.logout();
        }
      },
      err => {
        this.authenticationService.logout();
        console.log(err);
      }
    );;
    
  }

  /**
   * declar - check login state
   */
  checkLoginState(){
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['gallery']);
      }
    });
  }
}
