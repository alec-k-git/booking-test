import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '../store/store.module';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelsContainer } from './hotels/hotels.container';
import { MakeReservationContainer } from './make-reservation/make-reservation.container';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { MaterialModule } from '../shared/modules/material.module';

@NgModule({
  declarations: [
    HotelsContainer,
    HotelsComponent,
    MakeReservationContainer,
    MakeReservationComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule,
    MaterialModule,
  ],
})
export class BookingModule { }