import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { User } from 'src/app/services/user.model';
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  event: Event;
  conf: ConferencesItem;
  user: User;
  type: string;
  currentUrl: string;

  settings: any = {
    title: 'QR Code',
    subtitle: 'Scan',
    description: '',
  };

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    this.currentUrl = 'http://localhost:4200/tabs/events/' + this.event.id;
    if (this.type === 'invite') {
      this.settings.title = "Qr Code d'invitation";
      this.settings.subtitle = 'Scannez moi';
      this.settings.description =
        "scannez ce Qr code pour visiter la page de l'événement \n" +
        this.event.title;
    }
    if (this.type === 'check-in') {
      this.currentUrl = `http://localhost:4200/tabs/loyality?eventId=${this.event.id}&confId=${this.conf.id}&Uid=${this.user.uid}`;
      this.settings.title = 'Qr Code de check-in';
      this.settings.subtitle = 'Scannez moi';
      this.settings.description =
        "scannez ce Qr code à l'entrée et la sortie de votre conférence\n" +
        this.conf.title;
    }
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
