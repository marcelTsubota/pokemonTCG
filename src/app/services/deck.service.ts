import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { Deck } from '../model/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly STORAGE_KEY = 'pokemonDecks';
  private decksSubject: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);
  public decks$: Observable<Deck[]> = this.decksSubject.asObservable();

  constructor() {
    // Carrega os decks do localStorage ao inicializar o serviço
    this.loadDecksFromLocalStorage();
  }

  private loadDecksFromLocalStorage() {
    const decksJson = localStorage.getItem(this.STORAGE_KEY);
    const decks = decksJson ? JSON.parse(decksJson) : [];
    this.decksSubject.next(decks);
  }

  private saveDecksToLocalStorage(decks: Deck[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(decks));
    this.decksSubject.next(decks);
  }

  getDecks(): Observable<Deck[]> {
    return this.decks$;
  }

  getDeckById(deckId: string): Observable<Deck | undefined> {
    return this.decks$.pipe(map(decks => decks.find(d => d.id === deckId)));
  }

  deleteDeck(deckId: string): Observable<void> {
    return this.decks$.pipe(
      take(1),
      map(decks => decks.filter(deck => deck.id !== deckId)),
      tap(updatedDecks => this.saveDecksToLocalStorage(updatedDecks)),
      map(() => {})
    );
  }

  saveDeck(deck: Deck): Observable<void> {
    return this.decks$.pipe(
      take(1),
      map(decks => [...decks, deck]),
      tap(updatedDecks => this.saveDecksToLocalStorage(updatedDecks)),
      map(() => {})
    );
  }

  deleteCardFromDeck(deckId: string, cardId: string): Observable<void> {
    return this.decks$.pipe(
      take(1),
      map(decks => decks.map(deck => {
        if (deck.id === deckId) {
          deck.cards = deck.cards.filter(card => card.id !== cardId);
        }
        return deck;
      })),
      tap(updatedDecks => this.saveDecksToLocalStorage(updatedDecks)),
      map(() => {})
    );
  }

  addCardToDeck(deckId: string, cardId: string): Observable<void> {
    return this.decks$.pipe(
      take(1),
      map(decks => decks.map(deck => {
        if (deck.id === deckId) {
          deck.cards.push({ id: cardId, /* outras propriedades da carta */ });
        }
        return deck;
      })),
      tap(updatedDecks => this.saveDecksToLocalStorage(updatedDecks)),
      map(() => {})
    );
  }
  
  
}
