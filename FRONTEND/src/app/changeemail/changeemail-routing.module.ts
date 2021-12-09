import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeemailPage } from './changeemail.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeemailPageRoutingModule {}
