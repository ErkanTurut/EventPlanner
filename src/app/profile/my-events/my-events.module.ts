import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEventsPageRoutingModule } from './my-events-routing.module';

import { MyEventsPage } from './my-events.page';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyEventsPageRoutingModule],
  declarations: [MyEventsPage, EditModalComponent],
  entryComponents: [EditModalComponent],
})
export class MyEventsPageModule {}
