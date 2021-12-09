import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfomodalPageRoutingModule } from './infomodal-routing.module';

import { InfomodalPage } from './infomodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfomodalPageRoutingModule
  ],
  declarations: [InfomodalPage]
})
export class InfomodalPageModule {}
