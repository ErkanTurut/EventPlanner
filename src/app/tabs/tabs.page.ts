import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getUser() {
    this.dataService
      .getUser(this.authService.currentUser.uid)
      .subscribe(async (res) => {
        console.log(res);
        if (!res) {
          await this.dataService.addUser({
            id: this.authService.currentUser.uid,
            name: this.authService.currentUser.displayName,
            email: this.authService.currentUser.email,
          });
        }
        return res;
      });
  }
}
