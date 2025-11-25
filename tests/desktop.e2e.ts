import { test, expect } from '@playwright/test';

test.describe('Desktop and Window Management E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('create new folder from desktop context menu', async ({ page }) => {
    // Right click on desktop to open context menu
    await page.click('body', { button: 'right' });

    // Click "New Folder" menu item (assuming menu text)
    await page.click('text=New Folder');

    // Expect a new folder icon with the title "New Folder 1" to appear
    const folder1 = page.locator('button:has-text("New Folder 1")');
    await expect(folder1).toBeVisible();

    // Open the folder by clicking it
    await folder1.click();

    // Expect the file explorer window to be visible
    const explorerWindow = page.locator('[role="window"] >> text=File Explorer');
    await expect(explorerWindow).toBeVisible();
  });

  test('drag and drop folder icon to new position', async ({ page }) => {
    // Create a folder first
    await page.click('body', { button: 'right' });
    await page.click('text=New Folder');
    const folder = page.locator('button:has-text("New Folder 1")');
    await expect(folder).toBeVisible();

    // Drag folder icon by offset
    await folder.hover();
    await page.mouse.down();
    await page.mouse.move(300, 300);
    await page.mouse.up();

    // Confirm the new position by checking style attribute (if accessible)
    // Note: This step depends on the implementation detail of the desktop icon/component
  });

  test('window open, minimize, maximize and close workflow', async ({ page }) => {
    // Open a known app window
    await page.click('button:has-text("My Story")');
    const win = page.locator('[role="window"] >> text=My Story');
    await expect(win).toBeVisible();

    // Minimize the window
    await win.locator('button[aria-label="Minimize"]').click();
    await expect(win).toHaveClass(/minimized/);

    // Maximize the window
    await win.locator('button[aria-label="Maximize"]').click();
    await expect(win).toHaveClass(/maximized/);

    // Close the window
    await win.locator('button[aria-label="Close"]').click();
    await expect(win).not.toBeVisible();
  });

  test('notification center opens and displays notifications', async ({ page }) => {
    // Open notification center
    await page.click('button[aria-label="Open Notifications"]');
    const notificationCenter = page.locator('.notification-center');
    await expect(notificationCenter).toBeVisible();

    // Check for default notifications
    await expect(notificationCenter.locator('text=Welcome')).toBeVisible();
    await expect(notificationCenter.locator('text=New Feature')).toBeVisible();
  });

  test('user profile can be created, edited, exported, and imported', async ({ page }) => {
    // Open user profile
    await page.click('button:has-text("User Profile")');
    const userProfile = page.locator('.user-profile-manager');
    await expect(userProfile).toBeVisible();

    // Create a new profile
    await userProfile.locator('button:has-text("Create a Profile")').click();
    await userProfile.locator('input#name').fill('Test User');
    await userProfile.locator('input#email').fill('test@example.com');
    await userProfile.locator('button:has-text("Save Changes")').click();

    // Verify the profile was created
    await expect(userProfile.locator('text=Test User')).toBeVisible();
    await expect(userProfile.locator('text=test@example.com')).toBeVisible();

    // Edit the profile
    await userProfile.locator('button:has-text("Edit Profile")').click();
    await userProfile.locator('input#name').fill('Test User Edited');
    await userProfile.locator('button:has-text("Save Changes")').click();
    await expect(userProfile.locator('text=Test User Edited')).toBeVisible();

    // Export the profile
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      userProfile.locator('button:has-text("Export")').click(),
    ]);
    const path = await download.path();
    expect(path).toBeTruthy();

    // Import the profile
    await userProfile.locator('input#import-profile').setInputFiles(path);
    await expect(userProfile.locator('text=Test User Edited')).toBeVisible();
  });

  test('desktop icons are accessible', async ({ page }) => {
    const desktopIcon = page.locator('button[aria-label="Open My Story"]');
    await expect(desktopIcon).toHaveAttribute('role', 'button');
    await expect(desktopIcon).toHaveAttribute('tabindex', '0');
  });

  test('persistence of desktop icons and windows after reload', async ({ page }) => {
    // Create a folder
    await page.click('body', { button: 'right' });
    await page.click('text=New Folder');
    const folder = page.locator('button:has-text("New Folder 1")');
    await expect(folder).toBeVisible();

    // Reload page
    await page.reload();

    // Expect folder icon still present after reload
    await expect(folder).toBeVisible();
  });
});
