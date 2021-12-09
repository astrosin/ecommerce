import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsettingsPageRoutingModule } from './notificationsettings-routing.module';

import { NotificationsettingsPage } from './notificationsettings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsettingsPageRoutingModule
  ],
  declarations: [NotificationsettingsPage]
})
export class NotificationsettingsPageModule {}
