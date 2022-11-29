import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/services/user.model';
import { EditModalComponent } from '../event-modal/edit-modal.component';
import { ConfModalComponent } from '../conf-modal/conf-modal.component';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  loadedEvent: Event;
  loadedConf: ConferencesItem;
  isDataAvailable: boolean = false;
  user: User;
  selectedSegment = 'event';
  searchTerm: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
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
        delete data.conferences;
        if (role === 'confirm') {
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
}
