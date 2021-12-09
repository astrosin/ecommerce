import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GetuserPageRoutingModule } from './getuser-routing.module';

import { GetuserPage } from './getuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetuserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GetuserPage]
})
export class GetuserPageModule {}
