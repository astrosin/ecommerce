import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { AuthServiceService} from '../auth-service.service'
import { AlertController, MenuController } from '@ionic/angular';
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  addNewPayment = false
  constructor(private menuCtrl: MenuController, private fun: FunctionsService, private dataService: AuthServiceService, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  addPayment(){
    // this.addNewPayment = !this.addNewPayment;
  }

  done(){
    swal.fire("Awesome", "You just bought 2 awesome Product", "success");
    this.fun.navigate('home',false);
  }



  async back() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you want to cancel entering your payment info?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'mycolor',
          handler: (blah) => {
            this.fun.back();
          }
        }, {
          text: 'No',
          role: 'cancel',
          cssClass: 'mycolor',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

}
