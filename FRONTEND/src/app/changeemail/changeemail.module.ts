import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeemailPageRoutingModule } from './changeemail-routing.module';

import { ChangeemailPage } from './changeemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeemailPageRoutingModule
  ],
  declarations: [ChangeemailPage]
})
export class ChangeemailPageModule {}
