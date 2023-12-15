// deck-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Deck } from '../model/deck.model';
import { DeckService } from '../services/deck.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';


@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss'],
})
export class DeckDetailsComponent implements OnInit {
  @Input()
  deck: Deck | undefined;
  deckId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.deckId = params.get('id')!;
        return this.deckService.getDeckById(this.deckId);
      })
    ).subscribe(
      (deck: Deck | undefined) => {
        if (deck) {
          this.deck = deck;
        } else {
          console.error('Deck não encontrado com o ID:', this.deckId);
        }
      },
      error => {
        console.error('Erro ao carregar deck:', error);
      }
    );
  }

  loadDeck(): void {
    if (this.deckId) {
      this.deckService.getDeckById(this.deckId).subscribe(
        (foundDeck: Deck | undefined) => {
          if (foundDeck) {
            this.deck = foundDeck;
          } else {
            console.error('Deck não encontrado com o ID:', this.deckId);
          }
        },
        error => {
          console.error('Erro ao carregar deck:', error);
        }
      );
    } else {
      console.error('ID do deck não está definido.');
    }
  }

  getCardImageUrl(cardId: any): string | undefined {
    const card = this.deck?.cards.find(c => c.id === cardId.id);
    return card?.imageUrl;
  }

  getCardName(cardId: any): string | undefined {
    const card = this.deck?.cards.find(c => c.id === cardId.id);
    return card?.name;
  }

  getCardSupertype(cardId: any): string | undefined {
    const card = this.deck?.cards.find(c => c.id === cardId.id);
    return card?.supertype;
  }

  getCardTypes(cardId: any): string[] {
    const card = this.deck?.cards.find(c => c.id === cardId.id);
    return card?.types || [];
  }

  getCardDetails(cardId: any): { imageUrl?: string, name?: string, supertype?: string, types?: string[] } {
    const card = this.deck?.cards.find(c => c.id === cardId.id);
  
    return {
      imageUrl: card?.imageUrl,
      name: card?.name,
      supertype: card?.supertype,
      types: card?.types || []
    };
  }

  deleteDeck() {
    if (this.deck) {
      this.deckService.deleteDeck(this.deck.id)
        .subscribe(() => {
          console.log('Deck excluído!');
          this.router.navigate(['/pokemon-list']);
        });
    }
  }

  deleteCard(cardId: string) {
    if (this.deck && this.deck.id) {

      if (this.deck.cards.length <= 24) {
        this.snackBar.open('O baralho deve ter pelo menos 24 cartas.', 'OK', {
          duration: 3000
        })
        console.log('O baralho deve ter pelo menos 24 cartas.');
        return;
      }

      this.deckService.deleteCardFromDeck(this.deck.id, cardId)
        .subscribe(() => {
          console.log(`Carta ${cardId} excluída do deck!`);
          this.loadDeck();
        },
        error => {
          console.error('Erro ao excluir carta:', error);
        });
    }
  }
  
  addCardToDeck() {
    console.log('Carta adicionada ao deck!');
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      data: {
        deck: this.deck,
      },
    });
  }

  getCardCountBySupertype(supertype: string): number {
    if (!this.deck) {
      return 0;
    }
    return this.deck.cards.filter(card => card.supertype === supertype).length;
  }

  getPokemonCount(): number {
    return this.getCardCountBySupertype('Pokémon');
  }

  getTrainerCount(): number {
    return this.getCardCountBySupertype('Trainer');
  }

  getUniqueTypesCount(): number {
    if (!this.deck) return 0;
    const uniqueTypesSet = new Set<string>();
    this.deck.cards.forEach(cardId => {
      if (cardId.types) {
        cardId.types.forEach((type: string) => {
          uniqueTypesSet.add(type);
        });
      }
    });
    console.log(uniqueTypesSet);
    return uniqueTypesSet.size;
  }
}
