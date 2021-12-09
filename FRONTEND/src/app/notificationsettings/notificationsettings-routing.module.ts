import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsettingsPage } from './notificationsettings.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsettingsPageRoutingModule {}
