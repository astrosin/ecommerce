import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplypromoPage } from './applypromo.page';

const routes: Routes = [
  {
    path: '',
    component: ApplypromoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplypromoPageRoutingModule {}
