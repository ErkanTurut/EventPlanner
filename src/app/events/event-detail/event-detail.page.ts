import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/services/events.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/user.model';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  loadedEvent: Event;
  isDataAvailable: boolean = false;
  user: User;
  searchTerm: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.isDataAvailable = false;
    await this.activatedRoute.paramMap.subscribe(async (paramMap) => {
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
          this.loadedEvent.conferences = await res;
          this.isDataAvailable = true;
        });
      });
    });
  }

  setBookedConference(conferenceId: string) {
    this.dataService.bookConference(
      this.loadedEvent.id,
      conferenceId,
      this.authService.currentUser.uid,
      this.loadedEvent.conferences.find((c) => c.id === conferenceId)
    );
    // this.eventsService.setBookedConference(this.loadedEvent.id, conferenceId);
  }

  isParticipants(conferenceId: string) {
    if (!this.loadedEvent) return false;
    return this.loadedEvent.conferences
      .find((c) => c.id === conferenceId)
      .participants.includes(this.authService.currentUser.uid);
  }

  isFavorite() {
    return this.user[0].favoriteEvents.includes(this.loadedEvent.id);
  }

  onFavorite() {
    this.dataService.addFavoriteEvent(this.user[0], this.loadedEvent.id);
  }
}
