import { test, expect } from '@playwright/test';
test('desktop navigation, FAQ, privacy and honest demo form',async({page})=>{
 await page.goto('/');
 await expect(page).toHaveTitle(/KA-TRACKER/);
 await page.getByRole('link',{name:'Get a Quote'}).first().click();
 await expect(page).toHaveURL(/#contact/);
 await page.getByRole('button',{name:'Check inquiry (demo)'}).click();
 await expect(page.locator('#name')).toBeFocused();
 await expect(page.locator('[aria-invalid="true"]')).toHaveCount(5);
 await page.locator('#name').fill('Test Customer');
 await page.locator('#email').fill('invalid');
 await page.locator('#mobile').fill('123');
 await page.locator('#vehicle').selectOption('Personal vehicles');
 await page.locator('#count').fill('0');
 await page.getByRole('button',{name:'Check inquiry (demo)'}).click();
 await expect(page.locator('#email-error')).toContainText('valid email');
 await expect(page.locator('#mobile-error')).toContainText('Philippine');
 await expect(page.locator('#count-error')).toContainText('whole number');
 await page.locator('#email').fill('test@example.com');
 await page.locator('#mobile').fill('+63 917 123 4567');
 await page.locator('#count').fill('2');
 let posted=false;page.on('request',r=>{if(r.method()==='POST')posted=true;});
 await page.getByRole('button',{name:'Check inquiry (demo)'}).click();
 await expect(page.getByRole('status')).toContainText('no inquiry has been sent or saved');
 expect(posted).toBe(false);
 const question=page.locator('summary').first();await question.focus();await page.keyboard.press('Enter');
 await expect(page.locator('details').first()).toHaveAttribute('open','');
 await page.keyboard.press('Enter');await expect(page.locator('details').first()).not.toHaveAttribute('open','');
 await page.getByRole('button',{name:'draft privacy policy',exact:true}).click();await expect(page.locator('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
 await expect(page.locator('a[href^="tel:"],a[href^="mailto:"]')).toHaveCount(0);
});
for(const width of [320,375,768,1024,1440])test(`responsive layout ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(width<=900){const menu=page.locator('.menu-toggle');await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.locator('nav').getByRole('link',{name:'Solutions',exact:true}).click();await expect(page).toHaveURL(/#solutions/);await expect(menu).toHaveAttribute('aria-expanded','false');await menu.click();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');}
 await page.screenshot({path:`test-results/preview-${width}.png`,fullPage:true});
});

