import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  isDataAvailable: boolean = false;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}
  ngOnInit() {
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

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Déconnexion',
      message: 'Etes-vous sûr de vouloir vous déconnecter?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'se déconnecter',
          handler: () => {
            this.authService.logout();
            window.location.reload();
          },
        },
      ],
    });
    await alert.present();
  }
}
