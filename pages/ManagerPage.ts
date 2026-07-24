import { Page, Locator } from '@playwright/test';

export interface Customer {
    firstName: string;
    lastName: string;
    postCode: string;
}

export class ManagerPage {
    readonly page: Page;
    readonly addCustomerBtn: Locator;
    readonly openAccountBtn: Locator;
    readonly customersBtn: Locator;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postCodeInput: Locator;
    readonly addCustomerSubmitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCustomerBtn = page.locator("button[ng-click='addCust()']");
        this.openAccountBtn = page.locator("button[ng-click='openAccount()']");
        this.customersBtn = page.locator("button[ng-click='showCust()']");
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postCodeInput = page.getByPlaceholder('Post Code');
        this.addCustomerSubmitBtn = page.locator("button[type='submit']");
    }

    async openAddCustomerTab(): Promise<void> {
        await this.addCustomerBtn.click();
        await this.firstNameInput.waitFor({ state: 'visible' });
    }

    async openCustomersTab(): Promise<void> {
        await this.customersBtn.click();
    }

    async addCustomer(customer: Customer): Promise<void> {
        await this.openAddCustomerTab();
        await this.firstNameInput.fill(customer.firstName);
        await this.lastNameInput.fill(customer.lastName);
        await this.postCodeInput.fill(customer.postCode);

        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.addCustomerSubmitBtn.click();
    }

    async addCustomers(customers: Customer[]): Promise<void> {
        for (const customer of customers) {
            await this.addCustomer(customer);
        }
    }
}