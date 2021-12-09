import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThnaksorderingPageRoutingModule } from './thnaksordering-routing.module';

import { ThnaksorderingPage } from './thnaksordering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThnaksorderingPageRoutingModule
  ],
  declarations: [ThnaksorderingPage]
})
export class ThnaksorderingPageModule {}
