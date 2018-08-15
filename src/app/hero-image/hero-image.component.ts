import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, interval, timer, of } from 'rxjs';
import { HeroService } from '../hero.service';
import { filter, sample, tap, debounce, timeout, map, debounceTime, throttle, delay, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css']
})
export class HeroImageComponent {

  heroImage$ = this.heroService.getHoverHeroId().pipe(
    debounceTime(250),
    switchMap(id => id != null ? this.heroService.fetchImage(id) : of(null)),
  );

  constructor(
    private heroService: HeroService
  ) { }

}
