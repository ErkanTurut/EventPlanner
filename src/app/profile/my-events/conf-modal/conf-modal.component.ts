import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conf-modal',
  templateUrl: './conf-modal.component.html',
  styleUrls: ['./conf-modal.component.scss'],
})
export class ConfModalComponent implements OnInit {
  conf: ConferencesItem;
  confForm: FormGroup;
  defaultConf: ConferencesItem = {
    title: '',
    description: '',
    location: '',
    price: 0,
    availableFrom: new Date(),
    availableTo: new Date(),
    participants: [],
    availablity: true,
    speakers: [],
    capacity: 0,
    documents: [],
    created: new Date(),
    updated: new Date(),
  };

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.conf = {
      ...this.defaultConf,
      ...this.conf,
    };

    this.confForm = this.formBuilder.group({
      title: [this.conf.title, [Validators.required]],
      description: [this.conf.description, [Validators.required]],
      location: [this.conf.location, [Validators.required]],
      price: [this.conf.price, [Validators.required, Validators.min(0)]],
      capacity: [this.conf.capacity, [Validators.required, Validators.min(0)]],
    });
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  availableFromChanged(event: any) {
    this.conf.availableFrom = new Date(event.detail.value);
  }

  availableToChanged(event: any) {
    this.conf.availableTo = new Date(event.detail.value);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    this.conf = await {
      ...this.conf,
      ...this.confForm.value,
    };
    return this.modalCtrl.dismiss(this.conf, 'confirm');
  }
}
