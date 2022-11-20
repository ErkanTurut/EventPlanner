import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { Event, ConferencesItem } from 'src/app/services/events.model';
import { AuthService } from 'src/app/services/auth.service';
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
    private dataService: DataService,
    private authService: AuthService
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

  // calculate attendance level at this conference
  getAttendanceLevel() {
    if (this.loadedConference) {
      const participants = this.loadedConference.participants.length;
      const capacity = this.loadedConference.capacity;
      const attendanceLevel = participants / capacity;
      return attendanceLevel;
    }
  }

  getAttendanceColor() {
    const attendanceLevel = this.getAttendanceLevel();
    if (attendanceLevel < 0.5) {
      return 'success';
    } else if (attendanceLevel < 0.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  isParticipants() {
    if (!this.loadedEvent) return false;
    return this.loadedConference.participants.includes(
      this.authService.currentUser.uid
    );
  }

  setBookedConference() {
    this.dataService.bookConference(
      this.loadedEvent.id,
      this.loadedConference.id,
      this.authService.currentUser.uid,
      this.loadedConference
    );
  }
}
