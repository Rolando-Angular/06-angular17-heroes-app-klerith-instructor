# HeroesApp

### Technologies
### Angular Material
### RouterModule (forRoot + forChild) + loadCHildren + children + pathMatch
### ActivatedRouter + Router
### environments file + custom pipes (@Pipe)
### pipe observable (catchError + swithMap + takeUntil)
### ReactiveFormModule + FormControl + FormGroup + formControlName
### @if against *ngIf
### @for against *ngFor
### Auth Guard (canMatchFn, canActivateFn)

### START UP
### 1. execute on terminal
```
ng add @angular/material
npm install json-server@0.17.4 -D
```
### 2. Put on style.css
```
@import "@angular/material/prebuilt-themes/deeppurple-amber.css";
```
### 3. Implement CDN primeflex on index.html
```
<link rel="stylesheet" href="https://unpkg.com/primeflex@latest/primeflex.min.css">
```
### 4. Simulate api backend through json-server
```
npx json-server --watch data/db.json
```

