import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/services/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizerRequest } from 'src/app/services/messages.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  user: User;
  organizerForm: FormGroup;
  organizerRequests: OrganizerRequest[];
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService.getOrganizerRequests().subscribe((data) => {
      this.organizerRequests = data.sort((a, b) => {
        return a.status === 'PENDING' ? -1 : 1;
      });
      console.log(this.organizerRequests);
    });
  }

  statusColor(status: string) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'success';
      case 'ACCEPTED':
        return 'medium';
      case 'REJECTED':
        return 'medium';
    }
  }
}
