import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfomodalPage } from './infomodal.page';

const routes: Routes = [
  {
    path: '',
    component: InfomodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfomodalPageRoutingModule {}
