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
      this.events = res.sort((a, b) => {
        return a.availableFrom - b.availableFrom;
      });
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

  getWelcomeMessage() {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return 'Bonne journée👋 !';
    } else if (hour < 18) {
      return 'Bonne après-midi✌️ !';
    } else {
      return 'Bonne soirée🌙 !';
    }
  }

  onFavorite(event: Event, slidingItem: any) {
    slidingItem.close();
    this.dataService.addFavoriteEvent(this.user[0], event.id);
  }

  isFavorite(event: Event) {
    return this.user[0].favoriteEvents.includes(event.id);
  }
  test(event) {
    console.log(event);
  }
}
