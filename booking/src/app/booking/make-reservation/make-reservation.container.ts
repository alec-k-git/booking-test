import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReservation } from 'src/app/shared/interfaces';
import { BookingFacade } from 'src/app/store';

@Component({
  selector: 'app-make-reservation',
  template: `
    <app-make-reservation-dumb
      [id]="data"
      (makeReservation)="onMakeReservation($event)"
    ></app-make-reservation-dumb>`,
})
export class MakeReservationContainer {

  constructor(
    private readonly bookingFacade: BookingFacade,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) { }

  onMakeReservation(data: IReservation) {
    this.bookingFacade.makeReservation(data);
  }

}
