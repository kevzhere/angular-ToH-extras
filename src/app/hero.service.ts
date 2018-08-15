import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, debounce, sample,
  filter, debounceTime, distinctUntilChanged,
  switchMap, skipWhile, bufferTime, delay } from 'rxjs/operators';
import { Observable, interval, timer, BehaviorSubject, combineLatest, of } from 'rxjs';

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
  private heroes$ = new BehaviorSubject<Hero[]>(null);
  private hoveredHeroId$ = new BehaviorSubject<string>(null);

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private filterService: FilterService
  ) {}

  findHero(id: string): Observable<Hero> {
    return this.getLoadedHeroes().pipe(
      map(heroes => {
        return heroes.find(hero => hero.id === id);
      })
    );
  }

  isLoadingHeroes(): Observable<Boolean> {
    return this.getHeroes().pipe(
      map(heroes => heroes == null)
    );
  }
  getLoadedHeroes(): Observable<Hero[]> {
    return this.heroes$.pipe(
      filter(heroes => heroes != null)
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  getFilteredHeroes(): Observable<Hero[]> {
    return combineLatest(this.getLoadedHeroes(), this.filterService.getFilter())
      .pipe(
        map(([heroes, filterString]) => {
          console.log('getting filtered heroes', heroes);
          console.log('filter', filterString);
          return heroes.filter(hero => (
            hero.name.toLowerCase().includes(filterString.toLowerCase())
          ));
        }),
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

  updateHero(id: string, hero): Observable<{}> {
    return this.http.put(this.url + '/' +  id, hero);
  }

  deleteHero(id: string): Observable<{}> {
    return this.http.delete(this.url + '/' + id);
  }

  removeHero(id: string): void {
    this.heroes$.next(this.heroes$.getValue().filter( hero => hero.id !== id));
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

  getHoverHeroId(): Observable<string> {
    return this.hoveredHeroId$.asObservable();
  }

  fetchImage(id: string): Observable<{}> {
    return this.http.get(`http://5b6c6f1dc06fb600146274e9.mockapi.io/api/v1/avatars/${id}`);
  }
}
