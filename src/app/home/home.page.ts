import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/services/events.model';
import { User } from 'src/app/services/user.model';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import SwiperCore, {
  Swiper,
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  Virtual,
} from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isDataAvailable: boolean = false;
  events: Event[] = [];
  user: User;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.15,
    autoplay: true,
  };
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
}
