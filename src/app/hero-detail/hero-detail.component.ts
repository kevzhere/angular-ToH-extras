import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {

  hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.heroService.findHero(id))
    ).subscribe(foundHero => this.hero = foundHero);
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.heroService.updateHero(this.hero.id, this.hero);
    this.location.back();
  }

  delete(): void {
    this.heroService.deleteHero(this.hero.id);
    this.location.back();
  }
}
