import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeedPlayersModalComponent } from './select-seed-players-modal.component';

describe('SelectSeedPlayersModalComponent', () => {
  let component: SelectSeedPlayersModalComponent;
  let fixture: ComponentFixture<SelectSeedPlayersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSeedPlayersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeedPlayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
