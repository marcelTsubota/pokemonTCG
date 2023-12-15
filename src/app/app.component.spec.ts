import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';
import { CardDetailsModalComponent } from './card-details-modal/card-details-modal.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { LayoutComponent } from './layout/layout.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddCardDialogComponent,
        CardDetailsModalComponent,
        DeckDetailsComponent,
        LayoutComponent,
        PokemonListComponent,
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pokemontcg'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokemontcg');
  });
});
