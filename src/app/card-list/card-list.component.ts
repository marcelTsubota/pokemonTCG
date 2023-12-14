import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  template: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() cardList: any[] = [];
}

