import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { concat } from  'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.scss'],
})
export class ProductModelComponent implements OnInit {
  public fileUploader: FileUploader = new FileUploader({});
  public validations_form: FormGroup;
  public hasBaseDropZoneOver: boolean = false;
  constructor(
    private adminService: AdminService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private router:Router
  ) {
    // Object.assign(this.product, navParams.get('selectedProduct'));
    this.validations_form = this.formBuilder.group({
      item_name:new FormControl('',Validators.compose([
        Validators.required
      ])),
      price:new FormControl('',Validators.compose([
        Validators.required
      ])),
      explanation:new FormControl('',Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveProduct() {
    // if(!this.product.id){
    //   this.createProduct();
    // }else{
    //   this.updateProduct();
    // }
  }

  createProduct() {
    // this.adminService.createProduct(this.product).subscribe(data => {
    //   this.presentToast('Product is created successfully.', true);
    //   this.modalCtrl.dismiss({
    //     'success': true,
    //     'createdProduct': data
    //   });
    // }, err => {
    //   this.presentToast('Unexpected error occurred.', false);
    // })
  }

  updateProduct() {
    // this.adminService.updateProduct(this.product).subscribe(data => {
    //   this.presentToast('Product is updated successfully.', true);
    //   this.modalCtrl.dismiss({
    //     'success': true,
    //     'editedProduct': data
    //   });
    // }, err => {
    //   this.presentToast('Unexpected error occurred.', false);
    // })
  }
  
 
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
  onSubmitLogin(data){
    console.log(data)
    let files = this.getFiles();
    let requests = [];
    let formData = new FormData();
    files.forEach((file) => {
      formData.append('img_file' , file.rawFile, file.name);
    });
      formData.append('item_name',data.item_name);
      formData.append('price' , data.price);
      formData.append('explanation',data.explanation);
      requests.push(this.adminService.createProduct(formData));
    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure to delete product?',
      buttons: [
        {
          text: 'Sure!',
          // handler: () =>
          //  {
          //   this.adminService.deleteProduct(this.product).subscribe(() => {
          //     this.presentToast('Product was deleted successfully', true);
          //     this.modalCtrl.dismiss({
          //       'success': true,
          //       'deleted': true,
          //       'editedProduct': this.product
          //     });
          //   }, err => {
          //     console.log(err);
          //     this.presentToast('Unexpected error occurred.', false);
          //   });
          // }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();
  }


  async presentToast(msg, success) {
    const toast = await this.toastCtrl.create({
      message: msg,
      //Colors can be found from theme/variables.scss
      color: (success ? 'success' : 'danger'),
      duration: 3000,

    });
    toast.present();
  }


}
