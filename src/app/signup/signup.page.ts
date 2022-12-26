import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get passwordConfirm() {
    return this.credentials.get('passwordConfirm');
  }

  get checkPasswords() {
    const pass = this.credentials.get('passwordConfirm').value;
    const confirmPass = this.credentials.get('password').value;
    return pass === confirmPass ? true : false;
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService
      .register(this.credentials.value)
      .then(async (res) => {
        if (res.user.uid) {
          console.log(res.user);
          this.authService.sendVerificationMail();
          await this.dataService.addUser({
            firstName: this.credentials.value.firstName,
            lastName: this.credentials.value.lastName,
            uid: res.user.uid,
            role: 'USER',
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            favoriteEvents: [],
            isOrganizer: false,
          });
          loading.dismiss();
          this.authService.logout();
          this.router.navigate(['verify-email']);
        }
      })
      .catch(async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registration failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
}
