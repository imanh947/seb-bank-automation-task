import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ManagerPage } from '../pages/ManagerPage';
import { CustomersPage } from '../pages/CustomerPage';
import { customersToAdd, customersToDelete } from '../data/customers';

test.describe('Q1 - SEB Bank: add customers, verify, then delete specific customers', () => {
    test('Bank Manager can add customers, verify they exist, delete specific customers, verify deleted customers', async ({ page }) => {
        const homePage = new HomePage(page);
        const managerPage = new ManagerPage(page);
        const customersPage = new CustomersPage(page);

        await test.step('Navigate to the home page and log in as Bank Manager', async () => {
            await homePage.goto();
            await homePage.loginAsBankManager();
        });

        await test.step('Add customers from the provided list', async () => {
            await managerPage.addCustomers(customersToAdd);
        });

        await test.step('Verify that all added customers exist in the customer list', async () => {
            await managerPage.openCustomersTab();
            await customersPage.verifyCustomersExists(customersToAdd);
        });

        await test.step('Delete specific customers from the provided list', async () => {
            for (const customer of customersToDelete) {
                await customersPage.deleteCustomer(customer);
                await customersPage.verifyCustomerDeleted(customer);
            }
        });
    });
});