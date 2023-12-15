import { Component, Inject, ElementRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../model/card.model';
import { Deck } from '../model/deck.model';
import { DeckService } from '../services/deck.service';
import { PokemonService } from '../services/pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
})
export class AddCardDialogComponent implements OnInit {
  deck: any;
  cards: any;
  loading = true;
  decks: Deck[] = [];
  allCards: any = []; 
  card: Card | undefined;
  selectedCards: Card[] = [];
  availableCards: Card[] = [];

  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deck: Deck }
  ) {
    this.deck = this.data.deck;
  }

  ngOnInit(): void  {
    this.getPokemonCards().subscribe(cards => {
      this.allCards = cards;
      this.getAvailableCards();
    });
  }

  getPokemonCards(): Observable<Card[]> {
    return this.pokemonService.getCards();
  }

  getAvailableCards(): void {
    const deckCardsArray = this.deck.cards;
    const allCardsArray = this.allCards.cards;
    this.availableCards = allCardsArray.filter((card: Card) => !deckCardsArray.some((deckCard: Card) => card.id === deckCard.id));
    this.loading = false;
  }

  loadDecks(): void {
    //const deckId = this.deck.id;
    this.deckService.getDecks().subscribe(
      decks => {
        this.decks = decks;
      },
      error => {
        console.error('Erro ao carregar decks:', error);
      }
    );
  }

  addCardToDeck(card: Card) {
    if (this.deckService && this.deck) {
      const deckId = this.deck.id;
      this.deckService.addCardToDeck(deckId, card.id)
      .subscribe(
        () => {
          this.deck.cards.push(card.id);
          this.selectedCards = this.selectedCards.filter(selectedCard => selectedCard.id !== card.id);
          this.snackBar.open(`Carta ${card.name} adicionada ao deck com sucesso!`, 'Fechar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Serviço do deck não disponível.');
    }
  }

  addSelectedCardToDeck(card: Card): void {
    this.dialogRef.close(card);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
