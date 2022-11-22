import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-conf-modal',
  templateUrl: './conf-modal.component.html',
  styleUrls: ['./conf-modal.component.scss'],
})
export class ConfModalComponent implements OnInit {
  conf;

  defaultConf: ConferencesItem = {
    title: 'My Conference',
    description: 'My Conference Description',
    location: 'My Conference Location',
    price: 0,
    availableFrom: new Date(),
    availableTo: new Date(),
    participants: [],
    availablity: true,
    speakers: [],
    capacity: 0,
    documents: [],
  };

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.conf = {
      ...this.defaultConf,
      ...this.conf,
    };
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

  async confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }
}
