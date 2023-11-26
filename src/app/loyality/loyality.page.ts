import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoadingController } from '@ionic/angular';
import { Participant } from '../services/events.model';
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
  eventId: string;
  confId: string;
  userId: string;
  participant: Participant;
  info = {
    title: 'Registration',
    description: 'Loading...',
    icon: {
      name: 'hourglass',
      color: 'primary',
    },
    type: 'loading',
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

  rate(score: number) {
    this.dataService.updateParticipant(
      this.eventId,
      this.confId,
      this.participant.id,
      {
        ...this.participant,
        rating: score,
      }
    );
    this.info = {
      title: 'Registration',
      description: 'Votre note a été enregistrée',
      icon: {
        name: 'happy',
        color: 'success',
      },
      type: 'success',
    };
    this.renavigate(this.eventId, this.confId);
  }

  getStarColor(score: number) {
    if (score <= 2) {
      return 'danger';
    }
    if (score === 3) {
      return 'warning';
    }
    if (score >= 4) {
      return 'success';
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(async (paramMap) => {
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent',
      });
      await loading.present();

      if (!paramMap.has('Uid')) {
        loading.dismiss();
        this.router.navigateByUrl('tabs/events');
      }
      if (!paramMap.has('confId')) {
        loading.dismiss();
        this.router.navigateByUrl('tabs/events');
      }
      if (!paramMap.has('eventId')) {
        loading.dismiss();
        this.router.navigateByUrl('tabs/events');
      }

      this.eventId = paramMap.get('eventId');
      this.confId = paramMap.get('confId');
      this.userId = paramMap.get('Uid');

      this.dataService
        .getParticipantByUid(this.eventId, this.confId, this.userId)
        .subscribe(async (res) => {
          this.participant = res.participant[0];
          //si pas participant alors créer un participant
          if (!res.participant[0]) {
            await this.dataService.addParticipant(this.eventId, this.confId, {
              uid: this.userId,
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
              type: 'check-in',
            };
            return this.renavigate(this.eventId, this.confId);
          }

          if (!res.participant[0].checkedIn) {
            await this.dataService.updateParticipant(
              this.eventId,
              this.confId,
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
              type: 'check-in',
            };
            return this.renavigate(this.eventId, this.confId);
          }

          if (res.participant[0].checkedIn) {
            if (!res.participant[0].checkOutDate) {
              await this.dataService.updateParticipant(
                this.eventId,
                this.confId,
                res.participant[0].id,
                {
                  ...res.participant[0],
                  checkOutDate: new Date(),
                }
              );
              loading.dismiss();
              return (this.info = {
                title: 'Registration',
                description: 'Votre chec-out in a été enregistré !',
                icon: {
                  name: 'log-out',
                  color: 'primary',
                },
                type: 'check-out',
              });
              //return this.renavigate(eventId, confId);
            }

            loading.dismiss();
            this.info = {
              title: 'Registration',
              description: 'Vous avez déjà effectué un check-out !',
              icon: {
                name: 'warning',
                color: 'warning',
              },
              type: 'warning',
            };
            return this.renavigate(this.eventId, this.confId);
          }
        });

      await loading.dismiss();
    });
  }
}
