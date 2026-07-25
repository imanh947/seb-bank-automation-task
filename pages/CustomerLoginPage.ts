import { Page, Locator } from '@playwright/test';

export class CustomerLoginPage {
  readonly page: Page;
  readonly userSelect: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userSelect = page.getByRole('combobox');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async selectCustomer(name: string): Promise<void> {
    await this.userSelect.selectOption({ label: name });
  }

  async login(): Promise<void> {
    await this.loginBtn.click();
  }
}