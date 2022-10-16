import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = 'Hello World';
  isChanged = false;

  onChangeText() {
    if (this.isChanged) {
      this.text = 'Hello World';
      this.isChanged = false;
    } else {
      this.text = 'Hello Ionic';
      this.isChanged = true;
    }
  }
  constructor() {}
}
