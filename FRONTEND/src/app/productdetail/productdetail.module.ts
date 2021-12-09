import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdetailPageRoutingModule } from './productdetail-routing.module';

import { ProductdetailPage } from './productdetail.page';
import { ProductComponent } from '../product/product.component';
import { InnerhomeComponent } from '../innerhome/innerhome.component';
import { ReviewComponent } from '../review/review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductdetailPageRoutingModule
  ],
  declarations: [ProductdetailPage,ProductComponent,InnerhomeComponent,ReviewComponent],
  entryComponents: [ProductComponent, InnerhomeComponent, ReviewComponent]
})
export class ProductdetailPageModule {}
