import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadPageRoutingModule } from './fileupload-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { FileuploadPage } from './fileupload.page';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FileuploadPageRoutingModule,
    FileUploadModule
  ],
  declarations: [FileuploadPage]
})
export class FileuploadPageModule {}
