import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/services/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.scss'],
})
export class OrganizerFormComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}
  user: User;
  organizerForm: FormGroup;
  ngOnInit() {
    console.log(this.user);
    this.organizerForm = this.fb.group({
      firstName: [this.user[0].firstName, [Validators.required]],
      lastName: [this.user[0].lastName, [Validators.required]],
      uid: [this.user[0].uid, [Validators.required]],
      topic: ['ORGANIZER_REQUEST', [Validators.required]],
      title: [
        `Demande organisateur : ${this.user[0].firstName} ${this.user[0].lastName}`,
        [Validators.required],
      ],
      email: [this.user[0].email, [Validators.required, Validators.email]],
      companyNumber: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      companyPhone: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyWebsite: [''],
      companyDescription: ['', [Validators.required]],
      motivation: ['', [Validators.required]],
      status: ['PENDING', [Validators.required]],
      adminId: [null],
    });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.organizerForm.value, 'confirm');
  }
}
