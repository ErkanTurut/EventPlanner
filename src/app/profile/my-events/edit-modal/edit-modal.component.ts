import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  event;
  defaultEvent: Event = {
    title: 'My Event',
    description: 'My Event Description',
    location: 'My Event Location',
    price: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1561490497-43bc900ac2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    availableFrom: new Date(),
    availableTo: new Date(),
    organizer: [],
    created: new Date(),
  };

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.event = {
      ...this.defaultEvent,
      ...this.event,
    };
    console.log(this.event);
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.event, 'confirm');
  }
}
