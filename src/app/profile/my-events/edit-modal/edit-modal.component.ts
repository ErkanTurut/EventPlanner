import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { ModalController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
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
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.event = {
      ...this.defaultEvent,
      ...this.event,
    };
  }
  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async uploadFile() {
    await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    }).then(
      async (photo) => {
        this.event.imageUrl = await fetch(photo.webPath);
        console.log(this.event.imageUrl);
      },
      (err) => {
        this.showAlert(err);
      }
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const blob = await this.event.imageUrl.blob();
    const filePath = `events/thumbnails/${this.imageName()}`;
    const url = await this.storageService.uploadImage(filePath, blob);
    console.log(url);
    this.event.imageUrl = url;
    this.modalCtrl.dismiss(this.event, 'confirm');
  }
}
