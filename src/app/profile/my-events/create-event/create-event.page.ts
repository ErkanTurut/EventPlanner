import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  event: Event = {
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
    private router: Router,
    private alertCtrl: AlertController,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.event);
  }

  async showAlert(err: string) {
    const alert = await this.alertCtrl.create({
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  createEvent() {
    console.log(this.event);
    this.event.organizer.push(this.authService.currentUser.uid);
    this.event.created = new Date();
    this.event.updated = new Date();
    this.dataService.addEvent(this.event).then(
      () => {
        this.router.navigateByUrl('tabs/profile/my-events');
      },
      (err) => {
        this.showAlert(err);
      }
    );
  }
}
