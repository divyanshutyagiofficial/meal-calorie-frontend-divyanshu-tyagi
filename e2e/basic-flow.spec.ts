import { test, expect } from '@playwright/test'

test.describe('Basic Login Flow', () => {
  test('should register user and land on dashboard', async ({ page }) => {
    // Test 1: Simple registration and dashboard redirect
    const testEmail = `user${Date.now()}@example.com`
    
    await page.goto('/register')
    await page.fill('input[name="firstName"]', 'Test')
    await page.fill('input[name="lastName"]', 'User')
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard', { timeout: 15000 })
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible()
  })

  test('should validate login form', async ({ page }) => {
    // Test 2: Login form validation
    await page.goto('/login')
    
    // Try submitting empty form
    await page.click('button[type="submit"]')
    
    // Should show validation errors
    await expect(page.locator('text=Invalid email')).toBeVisible()
  })
})
