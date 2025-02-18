import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public onLogin(): void {
    this.authService.login('fernando@gmail.com', '123456')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.router.navigate(['/']);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
