import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Event } from '../../services/events.model';
import { User } from '../../services/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from './event-modal/edit-modal.component';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {
  events: Event[] = [];
  user: User;
  searchTerm: string = '';
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe((res) => {
        this.user = res;

        this.dataService.getEvents().subscribe(async (res) => {
          this.events = await res
            .filter((e) => {
              return e.organizer.includes(this.user[0].uid);
            })
            .sort((a, b) => {
              return a.updated - b.updated;
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

  nav(eventId: string) {
    this.router.navigateByUrl('tabs/events/' + eventId);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.dataService.getEvents().subscribe((res) => {
        this.events = res.filter((e) => {
          return e.organizer.includes(this.user[0].uid);
        });
      });
      event.target.complete();
    }, 1000);
  }

  openEditModal() {
    this.modalCtrl
      .create({
        component: EditModalComponent,
        componentProps: { modalType: 'create' },
      })
      .then(async (modal) => {
        await modal.present();
        const { data, role } = await modal.onDidDismiss();

        if (role === 'confirm') {
          data.organizer.push(this.authService.currentUser.uid);
          data.created = new Date();
          data.updated = new Date();
          this.dataService.addEvent(data).then(
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
