import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

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
    private barcodeScanner: BarcodeScanner
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
  }
}
