import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetuserPage } from './getuser.page';

const routes: Routes = [
  {
    path: '',
    component: GetuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetuserPageRoutingModule {}
