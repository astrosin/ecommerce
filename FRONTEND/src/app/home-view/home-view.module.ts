import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeViewPageRoutingModule } from './home-view-routing.module';

import { HomeViewPage } from './home-view.page';
import { ProductlistPage } from '../productlist/productlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeViewPageRoutingModule
  ],
  declarations: [HomeViewPage,ProductlistPage]
})
export class HomeViewPageModule {}
