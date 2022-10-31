import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/services/events.model';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  loadedEvent: Event;
  isDataAvailable: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    this.isDataAvailable = false;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId')) {
        // redirect
        return;
      }
      const eventId = paramMap.get('eventId');

      this.dataService.getEvent(eventId).subscribe(async (res) => {
        this.loadedEvent = await res;
      });

      this.dataService.getConferences(eventId).subscribe(async (res) => {
        this.loadedEvent.conferences = await res;
        this.isDataAvailable = true;
      });
    });
  }

  setBookedConference(conferenceId: string) {
    // this.eventsService.setBookedConference(this.loadedEvent.id, conferenceId);
  }
  onSearchChange(searchTerm: any) {
    // this.loadedEvent.conferences = this.eventsService.searchConferences(
    //   searchTerm.detail.value,
    //   this.loadedEvent.id
    // );
  }
}
