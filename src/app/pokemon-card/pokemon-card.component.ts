import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  /* @Input()
  pokemon: string;

  @Input()
  numero: number; */

  setImgPokemon() {
    // const id = this.id;
    return 'https://docs.pokemontcg.io/#api_v1cards_list'
  }

}
