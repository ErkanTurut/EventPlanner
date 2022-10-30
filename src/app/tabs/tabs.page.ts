import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: User;
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe((o) => {
        if (!o.length) {
          return this.dataService.addUser({
            id: this.authService.currentUser.uid,
            role: 'user',
            displayName: this.authService.currentUser.displayName,
            email: this.authService.currentUser.email,
          });
        }
      });
  }

  test() {}
}
