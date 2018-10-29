import { AppPage } from './app.po';

describe('customer-portal App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header title', () => {
    page.navigateTo();
    expect(page.text()).toContain('TuskDesk');
  });
});
