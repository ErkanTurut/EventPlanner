import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
  emailVerified,
} from '@angular/fire/auth-guard';

import { AuthGuard } from './core/auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['events']);
const onlyAllowEmailVerified = () => emailVerified;

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: ':eventId',
        loadChildren: () =>
          import('./events/event-detail/event-detail.module').then(
            (m) => m.EventDetailPageModule
          ),
      },
      {
        path: ':eventId/:conferenceId',
        loadChildren: () =>
          import('./events/event-detail/conference/conference.module').then(
            (m) => m.ConferencePageModule
          ),
      },
    ],

    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
