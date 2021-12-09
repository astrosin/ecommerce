import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileuploadPage } from './fileupload.page';

const routes: Routes = [
  {
    path: '',
    component: FileuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileuploadPageRoutingModule {}
