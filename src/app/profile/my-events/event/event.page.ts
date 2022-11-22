import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/services/events.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/services/user.model';
import { EditModalComponent } from '../event-modal/edit-modal.component';
import { ConfModalComponent } from '../conf-modal/conf-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  loadedEvent: Event;
  isDataAvailable: boolean = false;
  user: User;
  selectedSegment = 'event';

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

  openConfModal() {
    this.modalCtrl
      .create({
        component: ConfModalComponent,
        componentProps: {
          event: this.loadedEvent,
        },
      })
      .then((modalEl) => {
        modalEl.present();
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
