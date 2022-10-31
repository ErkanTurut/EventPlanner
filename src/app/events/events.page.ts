import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/services/events.model';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  private initEvent: Event[] = [];
  events: Event[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getEvents().subscribe((res) => {
      this.events = res;
      this.initEvent = res;
      console.log(this.events);
    });
  }

  async onSearchChange(event: any) {
    this.events = this.initEvent;
    console.log(this.events);
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.events = this.events.filter((item) => {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
      console.log(this.events);
    }
  }
}
