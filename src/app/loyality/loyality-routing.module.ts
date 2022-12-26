import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyalityPage } from './loyality.page';

const routes: Routes = [
  {
    path: '',
    component: LoyalityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyalityPageRoutingModule {}
