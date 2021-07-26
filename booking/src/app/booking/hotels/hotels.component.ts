import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IHotel } from 'src/app/shared/interfaces';
import { FormControl } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hotels-dumb',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsComponent implements OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() set hotels(hotels: IHotel[] | null) {
    if (hotels?.length) {
      this.buildTable(hotels);
      this.filteredHotels = hotels;
    }
    this._hotels = hotels;
  }
  @Input() loading: boolean | null = false;
  @Output() makeReservation = new EventEmitter<number>();

  dataSource!: MatTableDataSource<IHotel>;
  displayedColumns = ['id', 'capacity', 'price', 'actions'];
  startDate = new FormControl();
  endDate = new FormControl();
  filteredHotels: IHotel[] = [];
  sub$ = new Subscription();
  private _hotels: IHotel[] | null = [];

  constructor() {
    this.sub$.add(combineLatest([this.startDate.valueChanges, this.endDate.valueChanges]).pipe(
      tap(([startDate, endDate]) => {
        this.filteredHotels = this._filter(startDate, endDate);
        this.buildTable(this.filteredHotels);
      }),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  _filter(startDate: string, endDate: string): IHotel[] {
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    if (startDateTime > endDateTime) return [];
    return !this.hotels ? [] : this.hotels.filter(h => {
      return (
        new Date(h.from).getTime() <= startDateTime &&
        new Date(h.to).getTime() >= endDateTime
      );
    });
  }

  buildTable(hotels: IHotel[]) {
    this.dataSource = new MatTableDataSource(hotels);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onMakeReservation(id: number) {
    this.makeReservation.emit(id);
  }

  get hotels() {
    return this._hotels;
  }

}
