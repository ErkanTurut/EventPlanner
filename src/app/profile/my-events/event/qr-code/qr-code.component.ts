import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Event, ConferencesItem } from 'src/app/services/events.model';
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  data: Event | ConferencesItem;
  type: string;
  currentUrl: string;

  settings: any = {
    title: 'QR Code',
    subtitle: 'Scan',
    description: '',
  };

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    //genere lien avec eventID pour qrcode//
    this.currentUrl = 'http://localhost:4200/tabs/events/' + this.data.id;
    if (this.type === 'invite') {
      this.settings.title = "Qr Code d'invitation";
      this.settings.subtitle = 'Scannez moi';
      this.settings.description =
        "scannez ce Qr code pour visiter la page de l'événement \n" +
        this.data.title;
    }
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
