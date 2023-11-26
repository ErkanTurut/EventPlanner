import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ActionSheetController } from '@ionic/angular';
import { OrganizerFormComponent } from './organizer-form/organizer-form.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  isDataAvailable: boolean = false;
  tickets: any = [];
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
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
        this.dataService.getPendingTickets().subscribe((data) => {
          this.tickets = data;
        });
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Modifier',
          icon: 'create',
          handler: () => {
            this.editProfile();
          },
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfileComponent,
      componentProps: {
        user: this.user,
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (data && role === 'confirm') {
      this.dataService.updateUser(data);
    }
  }

  organizerForm() {
    this.modalCtrl
      .create({
        component: OrganizerFormComponent,
        componentProps: {
          user: this.user,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData.data);
          resultData.data.createdAt = new Date();
          resultData.data.updatedAt = new Date();
          this.dataService.addOrganizerRequest(resultData.data);
        }
      });
  }
}
