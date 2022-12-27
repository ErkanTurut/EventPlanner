import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/services/events.model';
import { User } from 'src/app/services/user.model';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  isDataAvailable: boolean = false;
  events: Event[] = [];
  user: User;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    //recupere les favoris
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe(async (res) => {
        this.user = await res;
        this.dataService.getEvents().subscribe((res) => {
          this.events = res.filter((event) => {
            return this.user[0].favoriteEvents.includes(event.id);
          });
        });
      });

    //filter favorite events
  }

  nav(eventId: string) {
    this.router.navigateByUrl('tabs/events/' + eventId);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.dataService.getEvents().subscribe((res) => {
        this.events = res.filter((event) => {
          return this.user[0].favoriteEvents.includes(event.id);
        });
      });
      event.target.complete();
    }, 1000);
  }
}
