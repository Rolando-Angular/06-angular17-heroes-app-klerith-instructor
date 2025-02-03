import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) { }

  public ngOnInit(): void {
    this.heroesService.getHeroes()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(heroes => this.heroes = [...heroes]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
