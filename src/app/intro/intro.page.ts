import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { INTRO_KEY } from '../core/intro.guard';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  async start() {
    await Preferences.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
