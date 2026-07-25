# SEB Bank (globalsqa) — Playwright + TypeScript Automation

![Playwright Tests](https://github.com/imanh947/seb-bank-automation-task/actions/workflows/playwright.yml/badge.svg)

End-to-end test automation for the [SEB Bank demo app](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login), covering two scenarios:

- **Q1** — Bank Manager adds customers, verifies them, deletes specific ones
- **Q2** — Customer performs a sequence of deposits/withdrawals; the running balance is verified against the UI after every transaction

## Tech stack

- [Playwright](https://playwright.dev/) with TypeScript
- Page Object Model (POM) — one class per screen/flow
- Fixture data kept separate from page logic

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running tests

```bash
npx playwright test              # run everything, headless
npx playwright show-report       # view the last HTML report
```