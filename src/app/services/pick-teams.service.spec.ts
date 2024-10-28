import { TestBed } from '@angular/core/testing';

import { PickTeamsService } from './pick-teams.service';

describe('PickTeamsService', () => {
  let service: PickTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
