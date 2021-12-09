import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import {ProductModelComponent} from "./product-model/product-model.component"
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/Storage';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from "ng2-file-upload";



@NgModule({
  declarations: [AppComponent,ProductModelComponent],
  entryComponents: [],
  imports: [ReactiveFormsModule,BrowserModule, FileUploadModule,IonicModule.forRoot(),HttpClientModule, AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
