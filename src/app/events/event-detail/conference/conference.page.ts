import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { Event, ConferencesItem } from 'src/app/services/events.model';
@Component({
  selector: 'app-conference',
  templateUrl: './conference.page.html',
  styleUrls: ['./conference.page.scss'],
})
export class ConferencePage implements OnInit {
  loadedConference: ConferencesItem;
  loadedEvent: Event;
  isDataAvailable: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    this.isDataAvailable = false;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId') || !paramMap.has('conferenceId')) {
        // redirect
        return;
      }
      const eventId = paramMap.get('eventId');
      const conferenceId = paramMap.get('conferenceId');

      this.dataService.getEvent(eventId).subscribe(async (res) => {
        this.loadedEvent = await res;
        this.dataService
          .getConference(eventId, conferenceId)
          .subscribe(async (res) => {
            this.loadedConference = await res;
            this.isDataAvailable = true;
          });
      });
    });
  }
  setBookedConference() {
    // this.eventsService.setBookedConference(
    //   this.loadedEvent.id,
    //   this.loadedConferences.id
    // );
  }
}
