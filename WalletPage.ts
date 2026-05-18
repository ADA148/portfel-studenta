import { type Locator, type Page } from '@playwright/test';

export class WalletPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async otworzStrone() {
        await this.page.goto('http://localhost:3000');
    }

    async dodajWydatek(nazwa: string, kwota: string) {
        await this.page.getByPlaceholder('Co kupiłaś?').fill(nazwa);
        await this.page.getByPlaceholder('Kwota').fill(kwota);
        await this.page.getByRole('button', { name: 'Zatwierdź wydatek' }).click();
    }

    async usunPierwszyWydatek() {
        const element = this.page.locator('.group').first();
        await element.hover();
        await element.getByRole('button', { name: ' 🗑️ ' }).click();
    }

    async edytujPierwszyWydatek(nowaNazwa: string) {
        const element = this.page.locator('.group').first();
        await element.hover();
        await element.getByRole('button', { name: ' ✏️ ' }).click();

        await this.page.getByPlaceholder('Co kupiłaś?').fill(nowaNazwa);
        await this.page.getByRole('button', { name: 'Zapisz zmiany' }).click();
    }

    async pobierzLiczbeWydatkow(): Promise<number> {
        return await this.page.locator('.group').count();
    }
}
