import { test, expect } from '@playwright/test';

test.describe('EPAM Website - Client Work Navigation', () => {
  test('should navigate to Client Work page and verify content', async ({ page }) => {
    // Step 1: Navigate to https://www.epam.com/
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await page.waitForLoadState('networkidle');
      
      // Verify homepage loaded
      await expect(page).toHaveTitle(/EPAM/);
      await expect(page).toHaveURL('https://www.epam.com/');
    });

    // Step 2: Select "Services" from the header menu
    await test.step('Click on Services in the header menu', async () => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      // Click Services link using JavaScript to avoid overlay issues
      await page.evaluate(() => {
        const servicesLink = document.querySelector('nav a[href="/services"]');
        if (servicesLink) {
          (servicesLink as HTMLElement).click();
        }
      });
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      
      // Verify Services page loaded
      await expect(page).toHaveURL('https://www.epam.com/services');
      await expect(page).toHaveTitle(/Services/);
      await expect(page.getByRole('heading', { name: 'Services', level: 1 })).toBeVisible();
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click on "Explore Our Client Work" link', async () => {
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
      await expect(clientWorkLink).toBeVisible();
      await clientWorkLink.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Verify Client Work page loaded
      await expect(page).toHaveURL('https://www.epam.com/services/client-work');
      await expect(page).toHaveTitle('Client Work');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify "Client Work" heading is visible', async () => {
      const clientWorkHeading = page.getByRole('heading', { name: 'Client Work', level: 1 });
      
      // Assert the heading is visible
      await expect(clientWorkHeading).toBeVisible();
      
      // Additional verification - check the text content
      await expect(clientWorkHeading).toHaveText(/Client.*Work/);
      
      // Verify page contains expected content
      await expect(page.getByText(/We've helped more than.*Forbes Global 2000/)).toBeVisible();
    });
  });
});

test.describe('EPAM Website - Client Work Navigation (Alternative Approach)', () => {
  test('should navigate to Client Work page via direct URL', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.epam.com/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Direct navigation to Services page
    await page.goto('https://www.epam.com/services');
    await page.waitForLoadState('networkidle');
    
    // Click "Explore Our Client Work"
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    await page.waitForLoadState('networkidle');
    
    // Verify Client Work page
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    await expect(page).toHaveTitle('Client Work');
    await expect(page.getByRole('heading', { name: 'Client Work', level: 1 })).toBeVisible();
  });
});
