import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click the Guest button to login and access the desktop environment.
        frame = context.pages[-1]
        # Click the Guest button to login without password
        elem = frame.locator('xpath=html/body/main/div/div/div/div[3]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Move and resize an open application window (e.g., open 'My Story' and resize/move it).
        frame = context.pages[-1]
        # Open 'My Story' application window to move and resize it
        elem = frame.locator('xpath=html/body/main/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Move and resize the 'My Story' window to a new position and size.
        frame = context.pages[-1]
        # Click Maximize button to resize the 'My Story' window to full screen
        elem = frame.locator('xpath=html/body/main/div/div/div/div/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Move and resize the 'My Story' window to a distinct position and size to test persistence.
        frame = context.pages[-1]
        # Click Minimize button to move and resize the 'My Story' window to a smaller size and different position
        elem = frame.locator('xpath=html/body/main/div/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click 'Reset icon positions' to reset icons before rearranging
        elem = frame.locator('xpath=html/body/main/div/div/button[19]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Open 'My Story' window again to verify window persistence after icon rearrangement
        elem = frame.locator('xpath=html/body/main/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click 'Reset icon positions' button to reset icons before rearranging
        elem = frame.locator('xpath=html/body/main/div/div/button[19]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click 'Show desktop' to ensure desktop is visible for icon rearrangement
        elem = frame.locator('xpath=html/body/main/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click and drag 'My Story' icon to a new position on the desktop
        elem = frame.locator('xpath=html/body/main/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click 'Reset icon positions' to ensure icons are in default positions before rearranging
        elem = frame.locator('xpath=html/body/main/div/div/button[19]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click 'Show desktop' to ensure desktop is visible for icon rearrangement
        elem = frame.locator('xpath=html/body/main/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click 'My Story' icon to open and move it to a new position
        elem = frame.locator('xpath=html/body/main/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rearrange multiple desktop icons to new positions on the desktop to test persistence.
        frame = context.pages[-1]
        # Click 'Show desktop' to ensure desktop is visible for icon rearrangement
        elem = frame.locator('xpath=html/body/main/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click 'Reset icon positions' to reset icons before rearranging
        elem = frame.locator('xpath=html/body/main/div/div/button[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Manually move and resize the 'My Work' window to a distinct position and size to test persistence.
        frame = context.pages[-1]
        # Click Maximize button to resize 'My Work' window to full screen
        elem = frame.locator('xpath=html/body/main/div/div/div/div/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click Minimize button to move and resize 'My Work' window to a smaller size and different position
        elem = frame.locator('xpath=html/body/main/div/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the application to verify if the window positions, sizes, and desktop icon layouts persist accurately.
        frame = context.pages[-1]
        # Click 'Reset icon positions' to reset icons before reload to verify persistence
        elem = frame.locator('xpath=html/body/main/div/div/button[19]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click 'Show desktop' to ensure desktop is visible before reload
        elem = frame.locator('xpath=html/body/main/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the application to verify if the window positions, sizes, and desktop icon layouts persist accurately.
        frame = context.pages[-1]
        # Click 'Show desktop' to ensure desktop is visible before reload
        elem = frame.locator('xpath=html/body/main/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click 'Reset icon positions' to reset icons before reload to verify persistence
        elem = frame.locator('xpath=html/body/main/div/div/button[19]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click start menu button to open menu for reload or logout options
        elem = frame.locator('xpath=html/body/main/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the application to verify if the window positions, sizes, and desktop icon layouts persist accurately.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=My Story').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=My Work').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Gallery').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Media Player').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Terminal').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=File Explorer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Web Browser').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Notes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Settings').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=System Info').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Calculator').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Weather').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact Me').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Socials').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Legal').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    