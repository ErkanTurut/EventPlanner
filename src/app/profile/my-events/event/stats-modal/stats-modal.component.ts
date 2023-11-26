import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import {
  Event,
  ConferencesItem,
  Participant,
} from 'src/app/services/events.model';

@Component({
  selector: 'app-stats-modal',
  templateUrl: './stats-modal.component.html',
  styleUrls: ['./stats-modal.component.scss'],
})
export class StatsModalComponent implements AfterViewInit {
  type: string;
  event: any;
  participants: any[];
  conferences: ConferencesItem[];

  data: any = {
    conferences: {
      allTitles: [],
      allParticipants: [],
      participantsPerHour: [
        {
          hour: 0,
          participants: 0,
        },
      ],
      doughnoutData: {
        checkedIn: [],
        participants: [],
        unSubscribed: [],
      },
      indexHours: [],
      attendancesPerHour: [],
    },
  };

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(private modalCtrl: ModalController) {}

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async ngAfterViewInit() {
    console.log(this.type);
    console.log(this.event);
    console.log(this.participants);
    if (this.type == 'event') {
      this.conferences = this.event.conferences.sort((a, b) => {
        return a.availableFrom.toDate() - b.availableFrom.toDate();
      });
      console.log(this.conferences);
      this.conferences.forEach((conf) => {
        this.data.conferences.allTitles.push(conf.title);
        this.data.conferences.allParticipants.push(conf.participants.length);

        this.data.conferences.participantsPerHour.push({
          hour: conf.availableFrom,
          participants: conf.participants.length,
        });
      });

      let checkedIn = 0;
      let participants = 0;
      let unSubscribed = 0;
      this.participants.forEach((x) => {
        x.participant.forEach((p) => {
          if (p.checkedIn) {
            checkedIn += 1;
          }
          if (p.status) {
            participants += 1;
          } else {
            unSubscribed += 1;
          }
        });
      });
      this.data.conferences.doughnoutData.checkedIn = checkedIn;
      this.data.conferences.doughnoutData.participants = participants;
      this.data.conferences.doughnoutData.unSubscribed = unSubscribed;
    }
    console.log(this.data.conferences.doughnoutData);
    this.generateHours(
      this.data.conferences.participantsPerHour[1].hour.toDate().getHours(),
      this.data.conferences.participantsPerHour[
        this.data.conferences.participantsPerHour.length - 1
      ].hour
        .toDate()
        .getHours()
    );
    this.getParticipantsNumberByHours();

    setTimeout(() => {
      this.barChartMethod();
      this.lineChartMethod();
      this.doughnutChartMethod();
    }, 1000);
  }

  //get participants number for each hours
  getParticipantsNumberByHours() {
    let participants = [];
    this.data.conferences.indexHours.forEach(async (hour) => {
      let x = 0;
      await this.data.conferences.participantsPerHour.forEach((h) => {
        if (!h.hour) {
          return;
        }
        if (h.hour.toDate().getHours() == hour) {
          x = h.participants;
        }
      });
      participants.push(x);
    });

    this.data.attendancesPerHour = participants;
  }

  //function generate all hours from two hours
  generateHours(from: number, to: number) {
    console.log(from, to);
    let hours = [];
    for (let i = from; i <= to; i++) {
      hours.push(i);
    }

    this.data.conferences.indexHours = hours;
    console.log(this.data.conferences.indexHours);
  }

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.conferences.allTitles,
        datasets: [
          {
            label: 'Nombre de participants',
            data: this.data.conferences.allParticipants,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  lineChartMethod() {
    console.log(this.data.conferences.indexHours);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.data.conferences.indexHours,
        datasets: [
          {
            label: 'Attendances per hour',
            fill: false,
            tension: 1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data.attendancesPerHour,
            spanGaps: false,
          },
        ],
      },
    });
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Checked In', 'Participants', 'Unsubscribed'],
        datasets: [
          {
            label: '# of Votes',
            data: [
              this.data.conferences.doughnoutData.checkedIn,
              this.data.conferences.doughnoutData.participants,
              this.data.conferences.doughnoutData.unSubscribed,
            ],
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
            ],
          },
        ],
      },
    });
  }
}
