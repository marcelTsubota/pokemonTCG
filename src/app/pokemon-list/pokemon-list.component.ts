import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Deck } from '../model/deck.model';
import { Card } from '../model/card.model';
import { DeckService } from '../services/deck.service';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsModalComponent } from '../card-details-modal/card-details-modal.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  cards: any;
  selectedCard: any;
  decks: Deck[] = [];
  allCards: any = [];
  minSelectedCards = 24;
  deckName: string = '';
  searchTerm: string = '';
  allCardsOrder: any = []; 
  selectedCards: Card[] = [];
  isCardAdded: boolean = false;
  animationStates: { [key: string]: string } = {};
  decks$: Observable<Deck[]> = this.deckService.getDecks();
  cardStates: { [key: string]: boolean } = {};
  
  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPokemonCards();
    this.loadDecks();
    this.decks$ = this.deckService.getDecks();
  }

  loadDecks(): void {
    this.deckService.getDecks().subscribe(
      decks => {
        this.decks = decks;
      },
      error => {
        console.error('Erro ao carregar decks:', error);
      }
    );
  }

  getPokemonCards(): void {
    this.pokemonService.getCards().subscribe((data) => {
      this.cards = data;
      this.allCards = data;
      this.allCardsOrder = this.allCards.cards;
      this.allCardsOrder.sort((a: { name: string; }, b: { name: string; }) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    });
  }

  toggleCardSelection(card: any): void {
    this.cardStates[card.id] = !this.cardStates[card.id];
  
  
  console.log('After toggle', this.cardStates, this.selectedCards);
  
  console.log('Toggle function called for card:', card);
    if (this.cardStates[card.id]) {
      this.selectedCards.push(card);
    } else {
      this.selectedCards = this.selectedCards.filter(selectedCard => selectedCard.id !== card.id);
    }
    console.log('After toggle', this.cardStates, this.selectedCards);
  }

  isCardSelected(card: any): boolean {
    return this.cardStates[card.id] || false;
  }

  isCreateButtonDisabled(): boolean {
    return !this.isCreateButtonEnabled() || this.deckName.length < 3;
  }

  createNewList() {
    if (this.selectedCards.length >= 24 && this.selectedCards.length <= 60) {
      const cartasEscolhidas = this.selectedCards.filter(card => this.cardStates[card.id]);
      this.saveDeck(cartasEscolhidas).subscribe(() => {
        this.loadDecks();
        this.selectedCards = [];
        this.deckName = '';
        this.resetCardStates();
      });
    }
  }

  resetCardStates(): void {
    this.cardStates = {};
}
  
  saveDeck(cartasEscolhidas: any): Observable<void> {
    const deck: Deck = {
      id: Date.now().toString(),
      name: this.deckName,
      cards: cartasEscolhidas,
    };
  
    return this.deckService.saveDeck(deck);
  }

  isCreateButtonEnabled(): boolean {
    return this.selectedCards.length >= 24 && this.selectedCards.length <= 60;
  }

  get filteredCards(): any[] {
    return this.cards?.cards.filter((card: { name: string; }) =>
      card.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ) || [];
  }
  
  openCardDetailsModal(card: any): void {
    const dialogRef = this.dialog.open(CardDetailsModalComponent, {
      data: card,
      width: '60vw',
    });
  }

  toggleCardStatus(card: any): void {
    this.cardStates[card.id] = !this.cardStates[card.id];
  }
  
}
