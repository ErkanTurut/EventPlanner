import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {
  NavigationExtras,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { ConferencesItem, Event } from '../services/events.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: User;
  isDataAvailable: boolean = false;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe(async (res) => {
        if (!res.length) {
          await this.dataService.addUser({
            uid: this.authService.currentUser.uid,
            role: 'USER',
            displayName: this.authService.currentUser.displayName,
            email: this.authService.currentUser.email,
            photoURL: this.authService.currentUser.photoURL,
            favoriteEvents: [],
            isOrganizer: false,
          });
        }
        this.user = await res;
        this.isDataAvailable = true;
      });
  }

  async scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);
      })
      .catch((err) => {
        console.log('Error', err);
      });
    console.log(this.router.url);
    const url = this.router.url;
    const eventId = url.split('/')[3];
    const confId = url.split('/')[4];
    if (!eventId && !confId) {
      return console.log(
        "Ce ci est un button de test, veuillez vous rendre à une page de conférence pour l'utiliser"
      );
    }
    this.confLoyality(eventId, confId);
  }

  confLoyality(eventId, confId) {
    const params: NavigationExtras = {
      queryParams: {
        eventId: eventId,
        confId: confId,
        Uid: this.user[0].uid,
      },
    };
    console.log(params);
    this.router.navigate(['tabs/loyality'], params);
  }
}
