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

  heroes;
  onHover = false;
  filterValue = '';
  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.heroes = this.heroService.getFilteredHeroes();
  }

  updateHoverHeroId(id: string) {
    this.heroService.updateHoverHeroId(id);
    this.onHover = true;
  }

  removeHoverHeroId(): void {
    this.heroService.updateHoverHeroId(null);
    this.onHover = false;

  }
}
