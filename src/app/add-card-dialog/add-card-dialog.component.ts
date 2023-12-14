import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../model/card.model';
import { Deck } from '../model/deck.model';
import { DeckService } from '../services/deck.service';
import { PokemonService } from '../services/pokemon.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
})
export class AddCardDialogComponent implements OnInit {
  card: Card | undefined;
  cards: any;
  deck: any;
  decks: Deck[] = [];
  allCards: any = []; 
  availableCards: Card[] = [];

  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deck: Deck }
  ) {
    this.deck = this.data.deck;
  }
  ngOnInit(): void {
    this.getPokemonCards();
    setTimeout(() => {
      console.log("this.allcards", this.allCards);
      console.log("this.deck", this.deck);
      
      const deckCardsArray = this.deck.cards;
      const allCardsArray = this.allCards.cards;
      console.log('allCardsArray', allCardsArray);
      
      //this.availableCards = allCardsArray.filter((card: { id: any; }) => !deckCardsArray.some((deckCard: { id: any; }) => card.id === deckCard.id));
      this.availableCards = allCardsArray.filter((card: Card) => !deckCardsArray.some((deckCard: Card) => card.id === deckCard.id));


      /* this.availableCards = Object.values(this.allCards).filter((card1: any) => {
        console.log("card1", card1);
        !Object.values(this.deck).some((card2: any) => {
          console.log("card2", card2);
          card1 === card2
        });
      }); */

      console.log('this.availableCards', this.availableCards);
      }, 5000);   
  }

  getPokemonCards(): void {
    this.pokemonService.getCards().subscribe(data => {
      this.allCards = data;
    });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCardToDeck(card: Card) {if (this.deckService) {
    const deckId = 'ID_DO_SEU_DECK'; // Substitua pelo ID real do seu deck
    this.deckService.addCardToDeck(deckId, card.id).subscribe(
      () => {
        console.log(`Carta ${card.name} adicionada ao deck!`);
        // Adicione a lógica para atualizar o deck com a nova carta, se necessário
        this.dialogRef.close(card);
      },
      error => {
        console.error('Erro ao adicionar carta ao deck:', error);
        // Adicione a lógica para lidar com erros, se necessário
      }
    );
    } else {
      console.error('Serviço do deck não disponível.');
      // Adicione a lógica para lidar com a ausência do serviço, se necessário
    }
  }
}
