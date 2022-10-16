import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService
      .register(this.credentials.value)
      .then((res) => {
        if (res.user.uid) {
          loading.dismiss();
          this.router.navigateByUrl('/events', { replaceUrl: true });
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

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService
      .login(this.credentials.value)
      .then((res) => {
        if (res.user.uid) {
          loading.dismiss();
          this.router.navigateByUrl('/events', { replaceUrl: true });
        }
      })
      .catch(async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
}
