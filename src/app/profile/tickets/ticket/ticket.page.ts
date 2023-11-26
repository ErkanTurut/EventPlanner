import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OrganizerRequest } from 'src/app/services/messages.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.model';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService
  ) {}
  isDataAvailable: boolean = false;
  ticket: OrganizerRequest;
  userId: string;
  ticketAdmin: User;
  ticketUser: User;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ticketId')) {
        // redirect
        return;
      }
      const ticketId = paramMap.get('ticketId');
      console.log(ticketId);
      this.dataService.getTicketById(ticketId).subscribe((res) => {
        this.ticket = res;

        this.dataService.getUserById(this.ticket.adminId).then((res) => {
          if (res.docs.length > 0) {
            this.ticketAdmin = res.docs[0].data();
          }
          this.isDataAvailable = true;
        });

        this.dataService.getUserById(this.ticket.uid).then((res) => {
          if (res.docs.length > 0) {
            this.ticketUser = res.docs[0].data();
            this.ticketUser.docId = res.docs[0].id;
          }
        });

        this.userId = this.authService.currentUser.uid;
      });
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

  async updateTicket(status: string) {
    if (status === 'IN_PROGRESS') {
      this.ticket.adminId = this.authService.currentUser.uid;
    }
    if (status === 'ACCEPTED') {
      if (!this.ticketUser.companyId) {
        const company = await this.dataService.addCompany({
          name: this.ticket.companyName,
          number: this.ticket.companyNumber,
          address: this.ticket.companyAddress,
          phone: this.ticket.companyPhone,
          email: this.ticket.companyEmail,
          website: this.ticket.companyWebsite,
          description: this.ticket.companyDescription,
          status: 'ACTIVE',
          createdDate: new Date(),
          createdBy: this.ticketUser.uid,
          updatedDate: new Date(),
        });
        this.ticketUser.companyId = company.id;
      } else {
        await this.dataService
          .getCompanyById(this.ticketUser.companyId)
          .then(async (res) => {
            if (res.data()) {
              const company = res.data();
              company.name = this.ticket.companyName;
              company.number = this.ticket.companyNumber;
              company.address = this.ticket.companyAddress;
              company.phone = this.ticket.companyPhone;
              company.email = this.ticket.companyEmail;
              company.website = this.ticket.companyWebsite;
              company.description = this.ticket.companyDescription;
              company.status = 'ACTIVE';
              company.updatedDate = new Date();
              this.dataService.updateCompany(
                this.ticketUser.companyId,
                company
              );
            } else {
              await this.dataService
                .addCompany({
                  name: this.ticket.companyName,
                  number: this.ticket.companyNumber,
                  address: this.ticket.companyAddress,
                  phone: this.ticket.companyPhone,
                  email: this.ticket.companyEmail,
                  website: this.ticket.companyWebsite,
                  description: this.ticket.companyDescription,
                  status: 'ACTIVE',
                  createdDate: new Date(),
                  createdBy: this.ticketUser.uid,
                  updatedDate: new Date(),
                })
                .then((res) => {
                  this.ticketUser.companyId = res.id;
                });
            }
          });
      }
      this.ticketUser.isOrganizer = true;
      this.dataService.updateUser(this.ticketUser);
    }
    if (status === 'REJECTED') {
      if (!this.ticketUser.companyId) {
        this.dataService
          .addCompany({
            name: this.ticket.companyName,
            number: this.ticket.companyNumber,
            address: this.ticket.companyAddress,
            phone: this.ticket.companyPhone,
            email: this.ticket.companyEmail,
            website: this.ticket.companyWebsite,
            description: this.ticket.companyDescription,
            status: 'DISABLED',
            createdDate: new Date(),
            createdBy: this.ticketUser.uid,
            updatedDate: new Date(),
          })
          .then((res) => {
            this.ticketUser.companyId = res.id;
          });
      } else {
        await this.dataService
          .getCompanyById(this.ticketUser.companyId)
          .then(async (res) => {
            if (res.data()) {
              const company = res.data();
              company.name = this.ticket.companyName;
              company.number = this.ticket.companyNumber;
              company.address = this.ticket.companyAddress;
              company.phone = this.ticket.companyPhone;
              company.email = this.ticket.companyEmail;
              company.website = this.ticket.companyWebsite;
              company.description = this.ticket.companyDescription;
              company.status = 'DISABLED';
              company.updatedDate = new Date();
              this.dataService.updateCompany(
                this.ticketUser.companyId,
                company
              );
            } else {
              await this.dataService
                .addCompany({
                  name: this.ticket.companyName,
                  number: this.ticket.companyNumber,
                  address: this.ticket.companyAddress,
                  phone: this.ticket.companyPhone,
                  email: this.ticket.companyEmail,
                  website: this.ticket.companyWebsite,
                  description: this.ticket.companyDescription,
                  status: 'DISABLED',
                  createdDate: new Date(),
                  createdBy: this.ticketUser.uid,
                  updatedDate: new Date(),
                })
                .then((res) => {
                  this.ticketUser.companyId = res.id;
                });
            }
          });
      }
      this.ticketUser.isOrganizer = false;
      this.dataService.updateUser(this.ticketUser);
    }
    this.ticket.status = status;
    this.dataService.updateTicket(this.ticket.docId, this.ticket);
  }
}
