import { Page, Locator, expect } from '@playwright/test';
import { Customer } from './ManagerPage';

export class CustomersPage {
    readonly page: Page;
    readonly searchCustomer: Locator;
    readonly customerTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchCustomer = page.getByRole('textbox', { name: 'Search Customer' });
        this.customerTable = page.locator('table tbody tr');
    }

    async search(name: string): Promise<void> {
        await this.searchCustomer.fill(name);
    }

    private rowFor(customer: Customer): Locator {
        return this.customerTable.filter({
            has: this.page.locator(`td:nth-child(1):text-is("${customer.firstName}")`),
        }).filter({
            has: this.page.locator(`td:nth-child(2):text-is("${customer.lastName}")`),
        });
    }

    async verifyCustomerExists(customer: Customer): Promise<void> {
        await this.search(customer.firstName);
        await expect(this.rowFor(customer)).toHaveCount(1);
    }

    async verifyCustomersExists(customers: Customer[]): Promise<void> {
        for (const customer of customers) {
            await this.verifyCustomerExists(customer);
        }
    }

    async deleteCustomer(customer: Customer): Promise<void> {
        await this.search(customer.firstName);
        const row = this.rowFor(customer);
        await expect(row).toHaveCount(1);
        await row.getByRole('button', { name: 'Delete' }).click();
    }

    async verifyCustomerDeleted(customer: Customer): Promise<void> {
        await this.search(customer.firstName);
        await expect(this.rowFor(customer)).toHaveCount(0);
    }
}