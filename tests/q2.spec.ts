import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { AccountPage } from '../pages/AccountPage';
import { transactions } from '../data/transactions';

test.describe('Q2 - XYZ Bank: verify balance after each transaction', () => {
  test('Hermoine Granger deposits/withdraws on account 1003, balance tallies each time', async ({ page }) => {
    const homePage = new HomePage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    await test.step('Login as customer Hermoine Granger', async () => {
      await homePage.goto();
      await homePage.customerLoginBtn.click();
      await customerLoginPage.selectCustomer('Hermoine Granger');
      await customerLoginPage.login();
    });

    let expectedBalance = 0;

    await test.step('Select account 1003 and confirm starting balance is 0', async () => {
      await accountPage.selectAccount('1003');
      const actual = await accountPage.getBalance();
      expect(actual).toBe(expectedBalance);
    });

    for (const [index, txn] of transactions.entries()) {
      await test.step(`Transaction ${index + 1}: ${txn.type} ${txn.amount}`, async () => {
        if (txn.type === 'Credit') {
          await accountPage.deposit(txn.amount);
          expectedBalance += txn.amount;
        } else {
          await accountPage.withdraw(txn.amount);
          expectedBalance -= txn.amount;
        }

        const actual = await accountPage.getBalance();
        expect(actual).toBe(expectedBalance);
      });
    }
  });
});