import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  Event,
  ConferencesItem,
  Participant,
} from 'src/app/services/events.model';
import { User } from 'src/app/services/user.model';

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { QrCodeComponent } from './qr-code/qr-code.component';
import { EditModalComponent } from '../event-modal/edit-modal.component';
import { ConfModalComponent } from './conf-modal/conf-modal.component';

import { Router, NavigationExtras } from '@angular/router';

import { StatsModalComponent } from './stats-modal/stats-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  loadedEvent: Event;
  loadedConf: ConferencesItem;
  loadedParticipants: any[] = [];
  isDataAvailable: boolean = false;
  user: User;
  selectedSegment = 'event';
  searchTerm: string = '';

  isQrCodeModalOpen: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    //get the event id from the url
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      if (!paramMap.has('eventId')) {
        // redirect
        return;
      }
      const eventId = paramMap.get('eventId');

      this.dataService
        .getUser(this.authService.currentUser.uid)
        .subscribe(async (res) => {
          this.user = await res;
        });

      this.dataService.getEvent(eventId).subscribe(async (res) => {
        this.loadedEvent = await res;
        this.dataService.getConferences(eventId).subscribe(async (res) => {
          this.loadedEvent.conferences = await res.sort((a, b) => {
            return a.availableFrom - b.availableFrom;
          });
          let x = [];
          this.loadedEvent.conferences.forEach((conf) => {
            this.dataService
              .getParticipants(eventId, conf.id)
              .subscribe(async (res) => {
                x.push(await res);
              });
            this.loadedParticipants = x;
          });

          this.isDataAvailable = true;
        });
      });
    });
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async deleteConf(conf: ConferencesItem) {
    const alert = await this.alertCtrl.create({
      message:
        'Etes vous sur de vouloir supprimer cette conférence ? \n Cette action est irréversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.dataService
              .deleteConference(this.loadedEvent.id, conf.id)
              .then(() => {
                this.showAlert('Conference deleted');
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteEvent() {
    const alert = await this.alertCtrl.create({
      message:
        'Etes vous sur de vouloir supprimer cet événement ? \n Cette action est irréversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.dataService.deleteEvent(this.loadedEvent.id).then(() => {
              this.showAlert('Event deleted');
              this.router.navigateByUrl('/tabs/profile/my-events');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  creatConf() {
    this.modalCtrl
      .create({
        component: ConfModalComponent,
        componentProps: { modalType: 'create' },
      })
      .then(async (modal) => {
        modal.present();
        const { data, role } = await modal.onDidDismiss();
        if (role === 'confirm') {
          data.created = new Date();
          data.updated = new Date();
          this.dataService.addConference(this.loadedEvent.id, data).then(
            () => {
              this.showAlert('Event created');
            },
            (err) => {
              this.showAlert(err);
            }
          );
        }
      });
  }

  editConf(conf: ConferencesItem) {
    this.modalCtrl
      .create({
        component: ConfModalComponent,
        componentProps: { modalType: 'edit', conf: conf },
      })
      .then(async (modal) => {
        modal.present();
        const { data, role } = await modal.onDidDismiss();
        if (role === 'confirm') {
          data.updated = new Date();
          this.dataService
            .updateConference(this.loadedEvent.id, conf.id, data)
            .then(
              () => {
                this.showAlert('Conference updated');
              },
              (err) => {
                this.showAlert(err);
              }
            );
        }
      });
  }

  openEditModal() {
    this.modalCtrl
      .create({
        component: EditModalComponent,
        componentProps: {
          event: this.loadedEvent,
          user: this.user,
        },
      })
      .then(async (modal) => {
        modal.present();
        const { data, role } = await modal.onDidDismiss();

        if (role === 'confirm') {
          if (data.conferences) delete data.conferences;
          data.updated = new Date();
          this.dataService.updateEvent(this.loadedEvent.id, data).then(
            () => {
              this.showAlert('Event created');
            },
            (err) => {
              this.showAlert(err);
            }
          );
        }
      });
  }

  openQrCodeModal(type: string, conf: ConferencesItem) {
    if (this.isQrCodeModalOpen) return;

    this.modalCtrl
      .create({
        component: QrCodeComponent,
        componentProps: {
          event: this.loadedEvent,
          conf: conf,
          user: this.user[0],
          type: type,
        },
        initialBreakpoint: 0.25,
        breakpoints: [0, 0.5, 0.75, 1],
        handleBehavior: 'cycle',
        backdropBreakpoint: 0.5,
      })
      .then(async (modal) => {
        modal.present();

        this.isQrCodeModalOpen = true;
        modal.onDidDismiss().then((res) => {
          this.isQrCodeModalOpen = false;
        });
      });
  }

  openStatsModal(type: string) {
    this.modalCtrl
      .create({
        component: StatsModalComponent,
        componentProps: {
          type: type,
          event: this.loadedEvent,
          participants: this.loadedParticipants,
        },
      })
      .then(async (modal) => {
        modal.present();
      });
  }

  confLoyality(conf: ConferencesItem) {
    const params: NavigationExtras = {
      queryParams: {
        eventId: this.loadedEvent.id,
        confId: conf.id,
        Uid: this.user[0].uid,
      },
    };
    this.router.navigate(['tabs/loyality'], params);
  }
}
