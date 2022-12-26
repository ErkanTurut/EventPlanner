import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyalityPageRoutingModule } from './loyality-routing.module';

import { LoyalityPage } from './loyality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoyalityPageRoutingModule
  ],
  declarations: [LoyalityPage]
})
export class LoyalityPageModule {}
