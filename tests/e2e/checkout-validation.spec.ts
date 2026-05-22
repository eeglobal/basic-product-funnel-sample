import { test, expect } from '@playwright/test';

test('should have the focus on the full name field', async ({ page }) => {
  await page.goto('/checkout');

  await expect(page.getByLabel(/full name/i)).toBeFocused();
});

test('should fail the form validation when the values are incorrect', async ({
  page,
}) => {
  await page.goto('/checkout');

  await page.getByLabel(/full name/i).fill('a');
  await page.getByLabel(/email/i).fill('a@a');
  await page.getByLabel(/shipping address/i).fill('a');
  await page.getByRole('button', { name: /place order/i }).click();

  await expect(page.getByText('The full name is required')).toBeVisible();
  await expect(page.getByText('Invalid email')).toBeVisible();
  await expect(page.getByText('The address is required')).toBeVisible();
});

test('should place the order when the form is correct', async ({ page }) => {
  await page.goto('/checkout');

  await page.getByLabel(/full name/i).fill('Erko Bridee');
  await page.getByLabel(/email/i).fill('erko@example.com');
  await page.getByLabel(/shipping address/i).fill('Luxembourg City');
  await page.getByRole('button', { name: /place order/i }).click();

  await expect(page.getByRole('status')).toContainText(
    /order placed successfully/i,
  );
});
