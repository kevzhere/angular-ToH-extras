import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { HeroService } from '../hero.service';
import { filter, sample, tap, timeout, bufferTime, throttle, delay } from 'rxjs/operators';
@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css']
})
export class HeroImageComponent implements OnInit {

  heroImage;
  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroService.fetchImage().pipe(
      delay(1000)
    )
      .subscribe(hero => {
        this.heroImage = hero;
        }
      );
  }

}
