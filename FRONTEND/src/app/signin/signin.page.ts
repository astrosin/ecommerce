import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage  {

  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  constructor(
    private alertController: AlertController,
    private authService: AuthServiceService,public router:Router,private menuCtrl: MenuController,private ss:SharedService
  ) {
    this.ss.change();
   }

  
  async ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    // this.menuCtrl.enable(true, 'end');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  signup(){
    this.router.navigateByUrl('signup');
  }
  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.OtpVerification();
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            console.log("phone number",this.CountryCode + this.PhoneNo);
              let navigationExtras: NavigationExtras = {
              queryParams: {
              MessageDetails: JSON.stringify(this.CountryCode + this.PhoneNo)
              }
              };
              navigationExtras["skipLocationChange"]=true;
              navigationExtras["replaceUrl"]=false;
              this.router.navigate(['getuser'],navigationExtras);
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }


}
