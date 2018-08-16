import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, switchMap, delay } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {

  hero;
  isLoading$;
  isUpdating;
  isDeleting;
  editing = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.isUpdating = false;
    this.isDeleting = false;
    this.isLoading$ = this.heroService.isLoadingHeroes();
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.heroService.findHero(id))
    ).subscribe(foundHero => this.hero = foundHero);
  }

  goBack(): void {
    this.location.back();
  }

  edit() {
    this.editing = !this.editing;
  }

  update(): void {
    this.isUpdating = true;
    this.heroService.updateHero(this.hero.id, this.hero)
      .pipe(
        delay(2000)
      )
      .subscribe(
        success => { console.log('updated'); this.isUpdating = false; },
        err => this.isUpdating = false
      );
    // this.location.back();
  }

  delete(): void {
    this.isDeleting = true;
    this.heroService.deleteHero(this.hero.id)
      .pipe(
        delay(2000)
      ).subscribe(
        success => {
          this.isDeleting = false;
          this.heroService.removeHero(this.hero.id);
        },
        err => {
          this.isDeleting = false;
          this.heroService.removeHero(this.hero.id);
        }
      );
  }
}
