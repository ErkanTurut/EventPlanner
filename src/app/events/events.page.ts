import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { EventsService } from './event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: Event[];
  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.events = this.eventsService.getAllEvents();
  }

  onSearchChange(event: any) {
    this.events = this.eventsService.searchEvents(event.detail.value);
  }
}
