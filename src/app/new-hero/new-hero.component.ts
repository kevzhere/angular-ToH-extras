import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  myHero: Hero = {name: null, id: null};
  hero;
  id;

  constructor(
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(data => this.id = data.length + 1);
  }

  newHero(): void {
    this.myHero.name = this.hero;
    this.myHero.id = this.id;
    this.heroService.postHero(this.myHero);
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
