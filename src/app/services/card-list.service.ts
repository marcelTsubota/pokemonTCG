import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  private cardLists: any[] = [];

  addCardList(cards: any[]): void {
    this.cardLists.push(cards);
  }

  getAllCardLists(): any[] {
    return this.cardLists;
  }
}