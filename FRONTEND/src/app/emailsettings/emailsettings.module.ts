import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailsettingsPageRoutingModule } from './emailsettings-routing.module';

import { EmailsettingsPage } from './emailsettings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailsettingsPageRoutingModule
  ],
  declarations: [EmailsettingsPage]
})
export class EmailsettingsPageModule {}
