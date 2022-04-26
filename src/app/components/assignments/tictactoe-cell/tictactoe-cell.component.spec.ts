import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeCellComponent } from './tictactoe-cell.component';

describe('TictactoeCellComponent', () => {
  let component: TictactoeCellComponent;
  let fixture: ComponentFixture<TictactoeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TictactoeCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TictactoeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
