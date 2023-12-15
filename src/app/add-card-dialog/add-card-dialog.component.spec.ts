import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCardDialogComponent } from './add-card-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Deck } from '../model/deck.model';

describe('AddCardDialogComponent', () => {
  let component: AddCardDialogComponent;
  let fixture: ComponentFixture<AddCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { 
            deck: { 
              id: 'deck', 
              name: 'pokemon', 
              cards: [1, 2, 3]
            } as Deck 
          } 
        },
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
