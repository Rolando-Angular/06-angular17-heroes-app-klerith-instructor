import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit, OnDestroy {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    }
  ]

  public get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  private destroy$ = new Subject<void>();

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id)),
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigateByUrl('/');
          return;
        }
        this.heroForm.reset({ ...hero });
      });
  }

  public onSubmit(): void {
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(hero => {
          this.showSnakcbar(`${hero.superhero} updated!`);
        });
      return;
    }
    // this.heroesService.updateHero(this.heroForm.value)
    this.heroesService.addHero(this.currentHero)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(hero => {
        this.showSnakcbar(`${hero.superhero} created!`),
          this.router.navigate(['/heroes/edit', hero.id]);
      })
  }

  private showSnakcbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
