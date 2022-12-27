import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-conf-modal',
  templateUrl: './conf-modal.component.html',
  styleUrls: ['./conf-modal.component.scss'],
})
export class ConfModalComponent implements OnInit {
  conf: ConferencesItem;
  confForm: FormGroup;
  foundSpeakers: any[] = [];
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
    tags: [],
    capacity: 0,
    documents: [],
    created: new Date(),
    updated: new Date(),
  };
  speakersPreview: any[] = [
    {
      uid: '',
      email: '',
    },
  ];
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastController: ToastController
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
      tags: ['', [Validators.min(0), Validators.max(20)]],
      speakers: [[]],
    });

    if (this.conf.speakers.length > 0) {
      this.conf.speakers.forEach(async (speaker, i) => {
        const res = await this.dataService.getUserById(speaker);
        this.speakersPreview[i] = {
          uid: res.docs[0].data().uid,
          email: res.docs[0].data().email,
        };
      });
    }
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      icon: 'alert-circle',
      color: color,
    });
    toast.present();
  }

  availableFromChanged(event: any) {
    this.conf.availableFrom = new Date(event.detail.value);
  }

  availableToChanged(event: any) {
    this.conf.availableTo = new Date(event.detail.value);
  }

  addTag(keyCode: number) {
    if (keyCode == 13) {
      this.conf.tags.push(this.confForm.value.tags);
    }
  }

  async addSpeaker(keyCode: number) {
    if (keyCode == 13) {
      const res = await this.dataService.getUserByEmail(
        this.confForm.value.speakers
      );
      console.log(res.docs, this.confForm.value.speakers);
      if (res.docs.length > 0) {
        this.conf.speakers.push(res.docs[0].data().uid);
        this.speakersPreview.push({
          uid: res.docs[0].data().uid,
          email: res.docs[0].data().email,
        });
        this.presentToast('Speaker added', 'success');
      } else {
        this.presentToast('Speaker not found', 'danger');
      }
    }
  }

  removeSpeaker(speaker: any) {
    console.log(speaker);
    this.speakersPreview = this.speakersPreview.filter(
      (s) => s.email != speaker.email
    );
    this.conf.speakers = this.conf.speakers.filter((s) => s != speaker.uid);
  }

  removeTag(tag: string) {
    this.conf.tags = this.conf.tags.filter((t) => t != tag);
  }

  cancel() {
    this.speakersPreview = [
      {
        uid: '',
        email: '',
      },
    ];
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    this.confForm.value.tags = this.conf.tags;
    this.confForm.value.speakers = this.conf.speakers;
    this.conf = await {
      ...this.conf,
      ...this.confForm.value,
    };
    return this.modalCtrl.dismiss(this.conf, 'confirm');
  }
}
