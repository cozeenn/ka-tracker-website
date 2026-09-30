import { test, expect } from '@playwright/test';
test('showcase navigation, FAQ and privacy',async({page})=>{
 await page.goto('/');
 await expect(page).toHaveTitle(/KA-TRACKER/);
 await page.getByRole('link',{name:'View Showcase'}).first().click();
 await expect(page).toHaveURL(/#showcase/);
 await expect(page.locator('form')).toHaveCount(0);
 await expect(page.getByText(/get a quote|request a quote|inquiry form/i)).toHaveCount(0);
 for (const href of await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))) {
   await expect(page.locator(href)).toHaveCount(1);
 }
 const question=page.locator('summary').first();await question.focus();await page.keyboard.press('Enter');
 await expect(page.locator('details').first()).toHaveAttribute('open','');
 await page.keyboard.press('Enter');await expect(page.locator('details').first()).not.toHaveAttribute('open','');
 await page.getByRole('button',{name:'Privacy policy'}).click();await expect(page.locator('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
 await expect(page.locator('a[href^="tel:"],a[href^="mailto:"]')).toHaveCount(0);
});
for(const width of [320,375,768,1024,1440])test(`responsive layout ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(width<=900){const menu=page.locator('.menu-toggle');await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.locator('nav').getByRole('link',{name:'Solutions',exact:true}).click();await expect(page).toHaveURL(/#solutions/);await expect(menu).toHaveAttribute('aria-expanded','false');await menu.click();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');}
 await page.screenshot({path:`test-results/preview-${width}.png`,fullPage:true});
});

