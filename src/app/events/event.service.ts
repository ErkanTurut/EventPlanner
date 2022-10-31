// import { Injectable } from '@angular/core';
// import { Event } from './event.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class EventsService {
//   private events: Event[] = [
//     {
//       id: 'e1',
//       title: 'Paris Retail Week',
//       description:
//         "Paris Retail Week réinvente l'expérience business à travers une offre globale pour les experts du e-commerce.",
//       location: 'Pl. de la Prte de Versailles, 75015 Paris, France',
//       imageUrl:
//         'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//       price: 149.99,
//       availableFrom: new Date('2021-01-01'),
//       availableTo: new Date('2021-12-31'),
//       conferences: [
//         {
//           id: 'c1',
//           availablity: true,
//           title: 'conf1',
//           description: 'In this course, you will learn a programming language!',
//           speakers: ['Maximilian', 'Anna'],
//           availableFrom: new Date('2021-01-01T03:24:00'),
//           availableTo: new Date('2021-12-31T03:24:00'),
//           location: 'Online',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//           ],
//         },
//         {
//           id: 'c2',
//           availablity: true,
//           title: 'conf2',
//           description: 'In this course, you will learn a programming language!',
//           speakers: ['Maximilian', 'Anna'],
//           availableFrom: new Date('2021-01-01T03:24:00'),
//           availableTo: new Date('2021-12-31T03:24:00'),
//           location: 'salon 3',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//           ],
//         },
//       ],
//     },
//     {
//       id: 'e2',
//       title: 'Ephec cours',
//       description: "Une journée de cours en E-business à l'Ephec",
//       location: 'Bruxelles',
//       imageUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/EPHEC_logo.svg/2560px-EPHEC_logo.svg.png',
//       price: 99.99,
//       availableFrom: new Date('2022-10-14'),
//       availableTo: new Date('2022-10-14'),
//       conferences: [
//         {
//           id: 'c1',
//           availablity: true,
//           title: 'Data analysis',
//           description:
//             "Ce cours est une introduction aux connaissances et compétences pratiques nécessaires pour développer une base solide en visualisation d'informations (data visualisation) et pour concevoir et développer des histoires basées sur ces données (Data Storytelling)",
//           speakers: ['Jérémie', 'Fabrizio'],
//           availableFrom: new Date('2022-10-14T08:30:00'),
//           availableTo: new Date('2022-10-14T09:00:00'),
//           location: 'Live',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://moodle.ephec.be/mod/resource/view.php?id=301059',
//           ],
//         },
//         {
//           id: 'c2',
//           availablity: true,
//           title: 'Atelier 2 : Définir sa méthodologie',
//           description:
//             'Le TFE a principalement pour objet de permettre aux étudiants de prouver leur capacité d’insertion socio-professionnelle par une réalisation autonome et personnelle apportant des solutions concrètes à une problématique d’organisation et permettant l’intégration des compétences et acquis des trois années de formation.',
//           speakers: ['Valérie', 'Marie'],
//           availableFrom: new Date('2022-10-14T09:00:00'),
//           availableTo: new Date('2022-10-14T12:00:00'),
//           location: 'Live',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: true,
//           documents: [],
//         },
//         {
//           id: 'c3',
//           availablity: true,
//           title: 'Conception et développement logiciel',
//           description:
//             '	Exposer aux étudiants les bases et fondamentaux du développement logiciel et leur enseigner les outils permettant l’analyse des besoins, la conception et le design d’une solution logicielle, son développement et son implémentation. Montrer par l’exemple, les interactions entre les différentes composantes d’un logiciel professionnels et leur enseigner les outils de développement et les langages permettant la création d’algorithmes intégrés. Introduire les notions de l’Internet de Objets (IOT), imaginer des solutions innovantes pour l’e-business de demain. Concevoir et construire un objet simple et le programmer ensuite pour le connecter au monde qui l’entoure.',
//           speakers: ['Jérôme', 'Stéphane'],
//           availableFrom: new Date('2022-10-14T13:45:00'),
//           availableTo: new Date('2022-10-14T16:00:00'),
//           location: 'SPV2',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: true,
//           documents: [],
//         },
//       ],
//     },
//     {
//       id: 'e3',
//       title: 'Networking for extroverts',
//       description: 'You probably need this course if you are an extrovert!',
//       location: 'Online',
//       imageUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
//       price: 99.99,
//       availableFrom: new Date('2021-01-01'),
//       availableTo: new Date('2021-12-31'),
//       conferences: [
//         {
//           id: 'c1',
//           availablity: true,
//           title: 'Programming for everyone',
//           description: 'In this course, you will learn a programming language!',
//           speakers: ['Maximilian', 'Anna'],
//           availableFrom: new Date('2021-01-01T03:24:00'),
//           availableTo: new Date('2021-12-31T03:24:00'),
//           location: 'salon 1',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//           ],
//         },
//         {
//           id: 'c2',
//           availablity: true,
//           title: 'Programming for everyone',
//           description: 'In this course, you will learn a programming language!',
//           speakers: ['Maximilian', 'Anna'],
//           availableFrom: new Date('2021-01-01T03:24:00'),
//           availableTo: new Date('2021-12-31T03:24:00'),
//           location: 'salon 2',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//           ],
//         },
//         {
//           id: 'c3',
//           availablity: true,
//           title: 'Programming for everyone',
//           description: 'In this course, you will learn a programming language!',
//           speakers: ['Maximilian', 'Anna'],
//           availableFrom: new Date('2021-01-01T03:24:00'),
//           availableTo: new Date('2021-12-31T03:24:00'),
//           location: 'salon 3',
//           booked: false,
//           attendance: 0,
//           price: 149.99,
//           vip: false,
//           documents: [
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//             'https://www.bepub.com/pics/webzine/small/paris-retail-week-le-salon-du-commerce-a-la-pointe-innovation_2021-09-20.jpg',
//           ],
//         },
//       ],
//     },
//   ];

//   constructor() {}
//   getAllEvents() {
//     return [...this.events];
//   }
//   getEvent(eventId: string) {
//     return {
//       ...this.events.find((event) => {
//         return event.id === eventId;
//       }),
//     };
//   }

//   getConference(eventId: string, conferenceId: string) {
//     return {
//       ...this.events
//         .find((event) => {
//           return event.id === eventId;
//         })
//         .conferences.find((conference) => {
//           return conference.id === conferenceId;
//         }),
//     };
//   }

//   searchEvents(searchTerm: string) {
//     return this.events.filter((event) => {
//       return event.title.toLowerCase().includes(searchTerm.toLowerCase());
//     });
//   }

//   searchConferences(searchTerm: string, eventId: string) {
//     return this.events
//       .find((event) => {
//         return event.id === eventId;
//       })
//       .conferences.filter((conference) => {
//         return conference.title
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       });
//   }

//   setBookedConference(eventId: string, conferenceId: string) {
//     const event = this.getEvent(eventId);
//     const conference = event.conferences.find((conference) => {
//       return conference.id === conferenceId;
//     });
//     if (conference.booked) {
//       conference.booked = false;
//     } else {
//       conference.booked = true;
//     }

//     console.log(event.title, conference.title, conference.booked);
//   }
// }
