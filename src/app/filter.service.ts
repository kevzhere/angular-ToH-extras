import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, sample, distinctUntilChanged, tap, skipWhile, takeWhile } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterValue = new BehaviorSubject<string>('');
  constructor() { }

  filter(value: string): void {
      this.filterValue.next(value);
  }

  getFilter(): Observable<string> {
    return this.filterValue.pipe(
      filter(val => !val.includes('a')),
      sample(interval(2000)),
      distinctUntilChanged(),
    );
  }
}
