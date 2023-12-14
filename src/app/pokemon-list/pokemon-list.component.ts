import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Deck } from '../model/deck.model';
import { Card } from '../model/card.model';
import { DeckService } from '../services/deck.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  cards: any;
  decks: Deck[] = [];
  minSelectedCards = 4;
  allCards: Card[] = []; 
  selectedCards: Card[] = [];
  animationStates: { [key: string]: string } = {};
  decks$: Observable<Deck[]> = this.deckService.getDecks();
  
  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPokemonCards();
    this.loadDecks();
    this.decks$ = this.deckService.getDecks();
  }

  loadDecks(): void {
    //this.decks = this.deckService.getDecks();
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
    });
  }

  toggleCardSelection(card: any) {
    card.selected = !card.selected; // Inverte o status de seleção
    if (card.selected) {
      this.selectedCards.push(card);
    } else {
      this.selectedCards = this.selectedCards.filter(selectedCard => selectedCard !== card);
    }
  }

  isCardSelected(card: any): boolean {
    return card.selected || false; // Retorna true se a carta está selecionada
  }

  isCreateButtonDisabled(): boolean {
    return this.selectedCards.length < this.minSelectedCards;
  }

  createNewList() {
    if (this.selectedCards.length >= 4 && this.selectedCards.length <= 60) {
      this.saveDeck(this.selectedCards)
        .subscribe(() => {
          console.log('Nova lista criada:', this.selectedCards);
          this.loadDecks();
        });
    } else {
      console.log('Selecione entre 4 e 60 cartas.');
    }
  }
  
  saveDeck(cartasEscolhidas: any): Observable<void> {
    const deck: Deck = {
      id: Date.now().toString(),
      name: 'Meu Deck', // Pode personalizar o nome conforme necessário
      cards: cartasEscolhidas, // Adicione a lógica para obter os IDs das cartas no deck
    };
  
    return this.deckService.saveDeck(deck);
  }
}
