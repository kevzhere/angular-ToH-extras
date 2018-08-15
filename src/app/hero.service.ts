import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, sample, distinctUntilChanged, switchMap, skipWhile, bufferTime } from 'rxjs/operators';
import { Observable, interval, BehaviorSubject, combineLatest } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { FilterService } from './filter.service';
import { MessageService } from './message.service';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';


@Injectable({
  providedIn: 'root'
})

export class HeroService {

  url = 'http://5b71bbe1586eb5001463a76e.mockapi.io/heroes';
  private heroes$ = new BehaviorSubject<Hero[]>([]);
  private hoveredHeroId$ = new BehaviorSubject<string>(null);

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private filterService: FilterService
  ) {}

  findHero(id: string): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes => {

        return heroes.find(hero => hero.id === id);
      })
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  getFilteredHeroes(): Observable<Hero[]> {
    return combineLatest(this.getHeroes(), this.filterService.getFilter())
      .pipe(
        map(([heroes, filter]) => {
          return heroes.filter(hero => (
            hero.name.toLowerCase().includes(filter.toLowerCase())
          ));
        })
      );
  }

  fetchHeroes(): void {
    this.http.get<Hero[]>(this.url)
      .subscribe(data => this.heroes$.next(data));
  }

  getHero(id: string): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    return this.http.get<Hero>(this.url + {id});
  }

  updateHero(id: string, hero): void {
    this.http.put(this.url + {id}, hero)
      .subscribe(result => alert('"Congrats on your updated hero!"'), err => alert('error updating hero'));
  }

  deleteHero(id: string): void {
    this.http.delete(this.url + {id})
    .subscribe(result => {
      alert('"Congrats on your deleting hero!"');
      this.heroes$.next(this.heroes$.getValue().filter( hero => {
        return hero.id !== id;
      }
      ));
    }, err => alert('error deleting hero'));
  }

  postHero(hero: Hero): void {
    this.http.post<Hero>(this.url, hero)
      .subscribe(createdHero => {
        alert('"Congrats on your new hero!"');
        this.heroes$.next(this.heroes$.getValue().concat(createdHero));
      }, err => alert('error creating hero'));
  }

  updateHoverHeroId(id: string): void {
    this.hoveredHeroId$.next(id);
  }

  getHoverHeroId(): string {
    return this.hoveredHeroId$.getValue();
  }

  fetchImage(): Observable<{}> {
    return this.http.get(`http://5b6c6f1dc06fb600146274e9.mockapi.io/api/v1/avatars/${this.getHoverHeroId()}`);
  }
}
