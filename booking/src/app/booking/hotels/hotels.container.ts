import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingFacade } from 'src/app/store';
import { MakeReservationContainer } from '../make-reservation/make-reservation.container';

@Component({
  selector: 'app-hotels',
  template: `
    <app-hotels-dumb
      [hotels]="hotels$ | async"
      [loading]="loading$ | async"
      (makeReservation)="openModal($event)"
    ></app-hotels-dumb>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsContainer implements OnInit {

  hotels$ = this.bookingFacade.hotels$;
  loading$ = this.bookingFacade.loading$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly bookingFacade: BookingFacade,
  ) { }

  ngOnInit() {
    this.bookingFacade.getHotels();
  }

  openModal(data: number) {
    this.dialog.open(MakeReservationContainer, {
      data,
      width: '600px',
    });
  }

}
