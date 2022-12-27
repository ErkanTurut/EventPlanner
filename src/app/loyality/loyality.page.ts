import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-loyality',
  templateUrl: './loyality.page.html',
  styleUrls: ['./loyality.page.scss'],
})
export class LoyalityPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private loadingController: LoadingController
  ) {}

  info = {
    title: 'Registration',
    description: 'Loading...',
    icon: {
      name: 'hourglass',
      color: 'primary',
    },
  };

  async renavigate(eventId: string, conferenceId: string) {
    await setTimeout(async () => {
      const loading = await this.loadingController.create({
        message: 'Vous allez être redirigé...',
        spinner: 'crescent',
      });
      await loading.present();
      setTimeout(async () => {
        await loading.dismiss();
        this.router.navigateByUrl(
          'tabs/events/' + eventId + '/' + conferenceId
        );
      }, 2000);
    }, 3000);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(async (paramMap) => {
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent',
      });
      await loading.present();
      if (!paramMap.has('Uid')) {
        this.router.navigateByUrl('tabs/events');
      }
      if (!paramMap.has('confId')) {
        this.router.navigateByUrl('tabs/events');
      }
      if (!paramMap.has('eventId')) {
        this.router.navigateByUrl('tabs/events');
      }
      const eventId = paramMap.get('eventId');
      const confId = paramMap.get('confId');
      const userId = paramMap.get('Uid');

      //si l'utilisateur n'est pas enregistré
      this.dataService
        .getParticipantByUid(eventId, confId, userId)
        .subscribe(async (res) => {
          //si pas participant alors créer un participant
          if (!res.participant[0]) {
            await this.dataService.addParticipant(eventId, confId, {
              uid: userId,
              status: false,
              created: new Date(),
              updated: new Date(),
              checkedIn: true,
              checkedInDate: new Date(),
            });
            loading.dismiss();
            this.info = {
              title: 'Registration',
              description: 'Votre check-in a été enregistré ',
              icon: {
                name: 'checkmark-circle',
                color: 'success',
              },
            };
            return this.renavigate(eventId, confId);
          }

          //si la personne n'a pas fait son check-in
          if (!res.participant[0].checkedIn) {
            await this.dataService.updateParticipant(
              eventId,
              confId,
              res.participant[0].id,
              {
                ...res.participant[0],
                checkedIn: true,
                checkedInDate: new Date(),
              }
            );
            loading.dismiss();
            this.info = {
              title: 'Registration',
              description: 'Votre check-in a été enregistré !',
              icon: {
                name: 'checkmark-circle',
                color: 'success',
              },
            };
            return this.renavigate(eventId, confId);
          }

          //si la personne a fait son check-in
          if (res.participant[0].checkedIn) {
            if (!res.participant[0].checkOutDate) {
              await this.dataService.updateParticipant(
                eventId,
                confId,
                res.participant[0].id,
                {
                  ...res.participant[0],
                  checkOutDate: new Date(),
                }
              );
              loading.dismiss();
              this.info = {
                title: 'Registration',
                description: 'Votre check-out in a été enregistré !',
                icon: {
                  name: 'log-out',
                  color: 'primary',
                },
              };
              return this.renavigate(eventId, confId);
            }

            loading.dismiss();
            this.info = {
              title: 'Registration',
              description: 'Vous avez déjà effectué un check-out !',
              icon: {
                name: 'warning',
                color: 'warning',
              },
            };
            return this.renavigate(eventId, confId);
          }
        });

      await loading.dismiss();
    });
  }
}
