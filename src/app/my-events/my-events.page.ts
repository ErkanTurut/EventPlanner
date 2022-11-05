import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Event } from '../services/events.model';
import { User } from '../services/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {
  events: Event[] = [];
  user: User;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe((res) => {
        this.user = res;

        this.dataService.getEvents().subscribe((res) => {
          this.events = res.filter((e) => {
            return e.organizer.includes(this.user[0].uid);
          });
        });
      });
  }

  nav(eventId: string) {
    this.router.navigateByUrl('tabs/events/' + eventId);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.dataService.getEvents().subscribe((res) => {
        this.events = res.filter((e) => {
          return e.organizer.includes(this.user[0].uid);
        });
      });
      event.target.complete();
    }, 1000);
  }
}
