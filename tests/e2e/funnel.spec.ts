import { test, expect } from '@playwright/test';

test('user completes the full product funnel', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: /a product funnel that feels clean, focused, and easy to buy from/i,
    }),
  ).toBeVisible();

  await page.getByRole('link', { name: /see the product/i }).click();
  await expect(page).toHaveURL(/\/product/);

  await expect(
    page.getByRole('heading', { name: /^focuslamp$/i }),
  ).toBeVisible();
  await page.getByRole('link', { name: /buy now/i }).click();
  await expect(page).toHaveURL(/\/checkout/);

  await page.getByLabel(/full name/i).fill('Erko Bridee');
  await page.getByLabel(/email/i).fill('erko@example.com');
  await page.getByLabel(/shipping address/i).fill('Luxembourg City');
  await page.getByRole('button', { name: /place order/i }).click();

  await expect(page.getByRole('status')).toContainText(
    /order placed successfully/i,
  );
});
