import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebase from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthServiceService } from './auth-service.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule,IonicStorageModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,    
      AngularFirestoreModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },StatusBar,SocialSharing,AuthServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
