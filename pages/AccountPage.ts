import { Page, Locator } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly accountSelect: Locator;
  readonly accountSummary: Locator;

  readonly transactionsTab: Locator;
  readonly depositTab: Locator;
  readonly withdrawlTab: Locator;

  readonly amountInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSelect = page.getByRole('combobox');
    this.accountSummary = page.locator('text=/Account Number/');

    this.transactionsTab = page.locator("button[ng-click='transactions()']");
    this.depositTab = page.locator("button[ng-click='deposit()']");
    this.withdrawlTab = page.locator("button[ng-click='withdrawl()']");

    this.amountInput = page.getByPlaceholder('amount');
    this.submitBtn = page.locator("button[type='submit']");
  }

  async selectAccount(accountNumber: string): Promise<void> {
    await this.accountSelect.selectOption({ label: accountNumber });
  }

  async getBalance(): Promise<number> {
    const text = await this.accountSummary.innerText();
    const match = text.match(/Balance\s*:\s*(-?\d+)/);
    if (!match) {
      throw new Error(`Could not parse balance from account summary text: "${text}"`);
    }
    return parseInt(match[1], 10);
  }

  async deposit(amount: number): Promise<void> {
    await this.depositTab.click();
    await this.page.getByText('Amount to be Deposited').waitFor({ state: 'visible' });
    await this.amountInput.fill(String(amount));
    await this.submitBtn.click();
  }

  async withdraw(amount: number): Promise<void> {
    await this.withdrawlTab.click();
    await this.page.getByText('Amount to be Withdrawn').waitFor({ state: 'visible' });
    await this.amountInput.fill(String(amount));
    await this.submitBtn.click();
}
}