import { test, expect } from '@playwright/test'

test.use({ storageState: { cookies: [], origins: [] } });

test('should navigate to the / page when user signIn', async ({ page }) => {
  await page.goto('./login')
  await page.getByRole('button').getByText('Log in').click();
  await page.getByPlaceholder("johndoe@gmail.com").fill('maxnoelsens@gmail.com');
  await page.getByPlaceholder("******").fill('azerty');
  await page.getByRole('button').getByText('Log in').click();
  await expect(page).toHaveURL('./')
})

test('should show the SignIn form', async ({ page }) => {
  await page.goto('./login')
  await page.getByRole('paragraph').getByText('Log in').click();
  await expect(page.getByRole("button").getByText('Log in')).toBeVisible();
})

test('should show the SignIp form', async ({ page }) => {
  await page.goto('./login')
  await page.getByRole('paragraph').getByText('Sign Up').click();
  await expect(page.getByRole("button").getByText('Create an account')).toBeVisible();
})