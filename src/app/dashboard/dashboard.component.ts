import { Component, OnInit } from '@angular/core';
import { map, combineLatest } from 'rxjs/operators';
import { timer, Observable, BehaviorSubject } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  isLoading$ = this.heroService.isLoadingHeroes();
  heroes$ = this.heroService.getFilteredHeroes();
  onHover = false;
  filterValue = '';
  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    console.log(this.heroes$, 'init');
  }

  updateHoverHeroId(id: string, e) {
    console.log('hover on');
    this.heroService.updateHoverHeroId(id);
    this.onHover = true;
  }

  removeHoverHeroId(e): void {
    console.log('hover off');
    this.heroService.updateHoverHeroId(null);
    this.onHover = false;

  }
}
