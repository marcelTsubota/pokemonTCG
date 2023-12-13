import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  cards: any;
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonCards();
  }

  getPokemonCards(): void {
    this.pokemonService.getCards().subscribe((data) => {
      this.cards = data;
    });
  }

}
