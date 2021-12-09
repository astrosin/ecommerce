import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplypromoPageRoutingModule } from './applypromo-routing.module';

import { ApplypromoPage } from './applypromo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplypromoPageRoutingModule
  ],
  declarations: [ApplypromoPage]
})
export class ApplypromoPageModule {}
