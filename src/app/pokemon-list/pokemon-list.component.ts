import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  cards: any;
  minSelectedCards = 24;
  allCards: PokemonCard[] = []; 
  selectedCards: PokemonCard[] = [];
  animationStates: { [key: string]: string } = {};
  
  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPokemonCards();
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
    if (this.selectedCards.length >= 24 && this.selectedCards.length <= 60) {
      console.log('Nova lista criada:', this.selectedCards);
    } else {
      console.log('Selecione entre 24 e 60 cards.');
    }
  }

}
