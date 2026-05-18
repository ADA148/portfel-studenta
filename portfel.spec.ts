import { test, expect } from '@playwright/test';
import { WalletPage } from '../pages/WalletPage';

test.describe('Podstawowe akcje w Portfelu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('Czy nagłówek Portfel Studenta jest widoczny', async ({ page }) => {
        const naglowek = page.getByRole('heading', { name: 'Portfel Studenta' });
        await expect(naglowek).toBeVisible();
    });

    test('Dodawanie nowego wydatku', async ({ page }) => {
        await page.getByPlaceholder('Co kupiłaś?').fill('Kawa na uczelni');
        await page.getByPlaceholder('Kwota').fill('15');
        await page.getByRole('button', { name: 'Zatwierdź wydatek' }).click();

        await expect(page.getByText('Kawa na uczelni').first()).toBeVisible();
    });

    test('Zmiana limitu miesięcznego', async ({ page }) => {
        const poleBudzetu = page.locator('input[type="number"]').first();
        await poleBudzetu.fill('3000');

        await expect.soft(page.getByText('Limit miesięczny: 3000 zł')).toBeVisible();
        await expect.soft(page.getByRole('heading', { name: 'Portfel Studenta' })).toBeVisible();
    });
});

test.describe('Testy korzystające z POM', () => {
    test('Usuwanie wydatku z listy', async ({ page }) => {
        const portfel = new WalletPage(page);
        await portfel.otworzStrone();

        await portfel.dodajWydatek('Testowy wydatek do usunięcia', '50');
        await expect(page.getByText('Testowy wydatek do usunięcia')).toBeVisible();

        const iloscPrzed = await portfel.pobierzLiczbeWydatkow();
        await portfel.usunPierwszyWydatek();
        await expect(page.locator('.group')).toHaveCount(iloscPrzed - 1);
    });

    test('Edycja wpisu', async ({ page }) => {
        const portfel = new WalletPage(page);
        await portfel.otworzStrone();

        await portfel.dodajWydatek('Stary zakup', '30');
        await expect(page.getByText('Stary zakup')).toBeVisible();

        await portfel.edytujPierwszyWydatek('Poprawiony zakup');
        await expect(page.getByText('Poprawiony zakup')).toBeVisible();
    });
});

test('Filtrowanie wydatków po dacie', async ({ page }) => {
    await page.goto('/');

    const listaMiesiecy = page.locator('select').nth(1);
    await listaMiesiecy.selectOption('02');

    await expect(page.getByText('Brak wpisów dla wybranego okresu')).toBeVisible();
});

const mojeWydatki = [
    { nazwa: 'Kawa', ikona: ' 💸 ' },
    { nazwa: 'Paliwo', ikona: ' 🚗 ' },
    { nazwa: 'Czynsz', ikona: ' 🏠 ' },
];

for (const wydatek of mojeWydatki) {
    test(`Dodawanie i emotikona dla: ${wydatek.nazwa}`, async ({ page }) => {
        await page.goto('http://localhost:3000');

        await page.getByPlaceholder('Co kupiłaś?').fill(wydatek.nazwa);
        await page.getByPlaceholder('Kwota').fill('100');
        await page.getByRole('button', { name: 'Zatwierdź wydatek' }).click();

        const boxZIkona = page.locator('.bg-emerald-100').filter({ hasText: wydatek.ikona });
        await expect(boxZIkona.first()).toBeVisible();
    });
}

test('Czy serwer odpowiada na zapytanie GET z autoryzacją', async ({ request }) => {
    const odpowiedz = await request.get('http://localhost:5000/api/expenses', {
        headers: {
            'Authorization': 'student-projekt-2025'
        }
    });

    expect(odpowiedz.ok()).toBeTruthy();
});
