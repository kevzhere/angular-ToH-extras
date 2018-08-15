import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.css']
})
export class HeroFilterComponent implements OnInit {

  filterValue;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  updateFilter(val: string) {
    this.filterValue = val;
    this.filterService.filter(val);
  }

}
