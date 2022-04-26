import { TestBed } from '@angular/core/testing';

import { GamesInterceptor } from './games.interceptor';

describe('GamesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GamesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GamesInterceptor = TestBed.inject(GamesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
