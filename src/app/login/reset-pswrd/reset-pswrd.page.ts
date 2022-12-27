import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-pswrd',
  templateUrl: './reset-pswrd.page.html',
  styleUrls: ['./reset-pswrd.page.scss'],
})
export class ResetPswrdPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}
  credentials: FormGroup;

  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async resetPassword() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.recoverPassword(this.credentials.value.email).then(
      () => {
        loading.dismiss();
        this.router.navigate(['login']);
      },
      async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Password reset failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
