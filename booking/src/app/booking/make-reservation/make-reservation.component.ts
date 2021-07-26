import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IReservation } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-make-reservation-dumb',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeReservationComponent implements OnInit {

  form!: FormGroup;

  @Input() id!: number;
  @Output() makeReservation = new EventEmitter<IReservation>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.id,
      name: [ null, Validators.required ],
      from: [ null, Validators.required ],
      to: [ null, Validators.required ],
    });
  }

  onSubmit(data: IReservation) {
    this.makeReservation.emit(data);
  }

  close() {
    this.dialog.closeAll();
  }

}
