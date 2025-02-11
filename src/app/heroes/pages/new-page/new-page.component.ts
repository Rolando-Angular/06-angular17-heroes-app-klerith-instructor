import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private dialog: MatDialog,
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

  public onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>
          this.heroesService.deleteHeroById(this.currentHero.id)
        ),
        filter((wasDeleted: boolean) => wasDeleted),
      ).subscribe(() => this.router.navigate(["/heroes"]));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
