import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(
    private heroService: HeroService
  ) {}

  ngOnInit() {
    setTimeout(() => this.heroService.fetchHeroes(), 2000);
  }
}
