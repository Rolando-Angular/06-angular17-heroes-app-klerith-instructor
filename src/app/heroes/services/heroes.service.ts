import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";
import { environments } from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroeById(id: string): Observable<Hero | null> {
    return this.httpClient.get<Hero | null>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(() => of(null)),
      );
  }

}
