import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEventsPageRoutingModule } from './my-events-routing.module';

import { MyEventsPage } from './my-events.page';
import { EditModalComponent } from './event-modal/edit-modal.component';
import { ConfModalComponent } from './conf-modal/conf-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyEventsPageRoutingModule,
  ],
  declarations: [MyEventsPage, EditModalComponent, ConfModalComponent],
  entryComponents: [EditModalComponent, ConfModalComponent],
})
export class MyEventsPageModule {}
