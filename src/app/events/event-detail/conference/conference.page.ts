import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { conferencesItem, Event } from '../../event.model';
import { EventsService } from '../../event.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.page.html',
  styleUrls: ['./conference.page.scss'],
})
export class ConferencePage implements OnInit {
  loadedConferences: conferencesItem;
  loadedEvent: Event;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId') || !paramMap.has('conferenceId')) {
        // redirect
        return;
      }
      const eventId = paramMap.get('eventId');
      const conferenceId = paramMap.get('conferenceId');
      this.loadedConferences = this.eventsService.getConference(
        eventId,
        conferenceId
      );
      this.loadedEvent = this.eventsService.getEvent(eventId);
    });
  }
  setBookedConference() {
    this.eventsService.setBookedConference(
      this.loadedEvent.id,
      this.loadedConferences.id
    );
  }
}
