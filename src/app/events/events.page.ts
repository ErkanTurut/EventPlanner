import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/services/events.model';
import { User } from 'src/app/services/user.model';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  searchTerm: string = '';
  isDataAvailable: boolean = false;
  events: Event[] = [];
  user: User;
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService.getEvents().subscribe((res) => {
      this.events = res;
    });

    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe(async (res) => {
        this.user = await res;
        this.isDataAvailable = true;
      });
  }

  onDrag(event: any) {
    console.log(event);
  }

  onFavorite(event: Event) {
    this.dataService.addFavoriteEvent(this.user[0], event.id);
  }

  isFavorite(event: Event) {
    return this.user[0].favoriteEvents.includes(event.id);
  }
}
