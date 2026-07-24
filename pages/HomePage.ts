import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeBtn: Locator;
    readonly customerLoginBtn: Locator;
    readonly managerLoginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeBtn = page.getByRole('button', { name: 'Home' });
        this.customerLoginBtn = page.getByRole('button', { name: 'Customer Login' });
        this.managerLoginBtn = page.getByRole('button', { name: 'Bank Manager Login' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/angularJs-protractor/BankingProject/#/login'); 
    }

    async loginAsBankManager(): Promise<void> {
        await this.managerLoginBtn.click();
    }
}