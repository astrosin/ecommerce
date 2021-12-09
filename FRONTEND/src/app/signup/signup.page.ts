import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { environment } from '../../environments/environment';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/Storage';
import { MenuController, IonSlides } from '@ionic/angular';
import { SharedService } from '../shared.service';

const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  password:string;
  mobile: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
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
    private storage: Storage,
    public ss:SharedService
  ) { this.menuCtrl.enable(true, 'start');
  this.ss.change();
  
}
  
  ngOnInit() {
   
    this.validations_form = this.formBuilder.group({
      
      mobile: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password:new FormControl('',Validators.compose([
        Validators.required
      ]))
      
    });

    /**
     * check login state
     */
    this.checkLoginState();
  }
  ionViewDidEnter() {
    // this.menuCtrl.enable(true, 'end');
  }

  validation_messages = {
    
    'mobile': [
      { type: 'required', message: 'mobile is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ]
  };

  onSubmitRegister(values){
    console.log(values)
    this.authenticationService.login(values) .subscribe(
      res => { // hide loading
        // example return data 
        // res = { isSuccess: true, tokenKey: 'token-key', others: 'others..' }
        if (res.key) {
          console.log(res.key);			
          return this.storage.set(TOKEN_KEY, res.key).then(() => {
            this.authenticationService.authenticationState.next(true);
            this.router.navigate(["home-view"]);
          });
        } else {
          this.authenticationService.loginFailedAlert();
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
 
 
  signin(){
    this.router.navigateByUrl('signin');
  }
  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
}
