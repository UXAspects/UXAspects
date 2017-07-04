import { browser } from 'protractor';

describe('UX Aspects E2E Tests', () => {

  beforeEach(() => browser.get(''));

  it('should have the correct tab title', () => {
    expect<any>(browser.getTitle()).toEqual('UX Aspects E2E Tests');
  });

});
