import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../events/events.module').then((m) => m.EventsPageModule),
          },
          {
            path: ':eventId',
            loadChildren: () =>
              import('../events/event-detail/event-detail.module').then(
                (m) => m.EventDetailPageModule
              ),
          },
          {
            path: ':eventId/:conferenceId',
            loadChildren: () =>
              import(
                '../events/event-detail/conference/conference.module'
              ).then((m) => m.ConferencePageModule),
          },
        ],
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/events',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

// {
//   path: 'home',
//   loadChildren: () =>
//     import('./home/home.module').then((m) => m.HomePageModule),
// },
// {
//   path: 'events',
//   children: [
//     {
//       path: '',
//       loadChildren: () =>
//         import('./events/events.module').then((m) => m.EventsPageModule),
//     },
//     {
//       path: ':eventId',
//       loadChildren: () =>
//         import('./events/event-detail/event-detail.module').then(
//           (m) => m.EventDetailPageModule
//         ),
//     },
//     {
//       path: ':eventId/:conferenceId',
//       loadChildren: () =>
//         import('./events/event-detail/conference/conference.module').then(
//           (m) => m.ConferencePageModule
//         ),
//     },
//   ],
//   // canActivate: [AuthGuard],
// },
