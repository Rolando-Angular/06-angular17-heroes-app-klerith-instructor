import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnDestroy {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;
  private destroy$ = new Subject<void>();

  constructor(
    private heroesService: HeroesService,
  ) { }

  public searchHero() {
    const value: string = this.searchInput.value ?? '';
    this.heroesService.getSuggestions(value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(heroes => {
        this.heroes = [...heroes];
      });
  }

  public onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedHero = event.option.value ?? undefined;
    if (!this.selectedHero) {
      return;
    }
    this.searchInput.setValue(this.selectedHero.superhero!);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
