import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailsettingsPage } from './emailsettings.page';

const routes: Routes = [
  {
    path: '',
    component: EmailsettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailsettingsPageRoutingModule {}
