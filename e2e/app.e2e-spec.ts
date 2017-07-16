import { NgxCoinsInvestPage } from './app.po';

describe('ngx-coins-invest App', () => {
  let page: NgxCoinsInvestPage;

  beforeEach(() => {
    page = new NgxCoinsInvestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
