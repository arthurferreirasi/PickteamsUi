import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTeamsComponent } from './pick-teams.component';

describe('PickTeamsComponent', () => {
  let component: PickTeamsComponent;
  let fixture: ComponentFixture<PickTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
