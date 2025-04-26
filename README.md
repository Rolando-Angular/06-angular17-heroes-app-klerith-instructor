# HeroesApp

### CONCEPTS
* Angular Material
* RouterModule (forRoot + forChild) + loadCHildren + children + pathMatch
* navigate + navigateByurl + createUrlTree + routerLink
* ActivatedRouter + Router
* environments file + custom pipes (@Pipe + PipeTrasnform)
* pipe observable (catchError + swithMap + takeUntil)
* ReactiveFormsModule + FormControl + FormGroup + formControlName
* @if against *ngIf
* @for against *ngFor
* Auth Guard (canMatchFn, canActivateFn)

### SET UP APPLICATION
1. execute on terminal
```
ng add @angular/material
npm install json-server@0.17.4 -D
```
2. Put on style.css
```
@import "@angular/material/prebuilt-themes/deeppurple-amber.css";
```
3. Implement CDN primeflex on index.html
```
<link rel="stylesheet" href="https://unpkg.com/primeflex@latest/primeflex.min.css">
```

### START UP APPLICATION
```
npm install
ng serve
npx json-server --watch data/db.json
```

### DEPLOYED ON GITHUB PAGES
https://rolando-angular.github.io/06-angular17-heroes-app-klerith-instructor

Before visiting Github page url, you must go to this page and wait for it to load correctly.
https://node-heroes-app-klerith-instructor-json.onrender.com/
