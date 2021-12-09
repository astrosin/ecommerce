
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
//Router: Navigate it after successfull login operation.
import { Router } from '@angular/router';
//MenuController: Sidemenu open/close, enable/disable operations.
//LoadingController: Loading bar for waiting operations.
//ToastController: Message box for success/error messages...
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  validations_form: FormGroup;
  loader: any;
  isDismiss = false;
  username:string;
  password:string;
  constructor(
    private userService: AdminService,
    private router: Router,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
    //Disable sidemenu on login page.
    this.menu.enable(false);
    //If user is exist, redirect it to home page.
    this.redirectPage(this.userService.currentUserValue);
  }
  validation_messages = {
    
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      
    ],
  };

  onSubmitLogin(values){
    this.userService.login_message;
    this.userService.login(values);
    if(this.userService.auth_boolean){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/home']);
    }
    
    // redirect page if login is successful
  }
  

  redirectPage(user) {
    if (user) {
      // this.router.navigate(['dashboard']);
    } 
  }
}
