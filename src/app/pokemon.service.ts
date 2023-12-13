import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url = 'https://api.pokemontcg.io/v1/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
