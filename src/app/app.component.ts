import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardListService } from './services/card-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemontcg';
  constructor(private cardListService: CardListService, private router: Router) {}

  openCardList(): void {
    const cardList = this.cardListService.getAllCardLists();
    this.router.navigate(['/card-list']);
  }

}