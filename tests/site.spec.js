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
 const question=page.locator('#faqs summary').first();await question.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#faqs details').first()).toHaveAttribute('open','');
 await page.keyboard.press('Enter');await expect(page.locator('#faqs details').first()).not.toHaveAttribute('open','');
 await page.getByRole('button',{name:'Privacy policy'}).click();await expect(page.locator('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
 await expect(page.locator('a[href^="tel:"],a[href^="mailto:"]')).toHaveCount(0);
});
test('vehicle keyboard selection, process markers and trip controls',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await page.getByRole('tab',{name:/Personal vehicles/}).focus();
 await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('tab',{name:/Motorcycles/})).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#vehicle-title')).toHaveText('Every ride has a story.');
 await expect(page.locator('#trip-vehicle')).toHaveText('Motorcycle');
 await page.keyboard.press('End');
 await expect(page.locator('#trip-vehicle')).toHaveText('Delivery van');
 await expect(page.locator('#vehicle-art svg')).toHaveAttribute('aria-label', /delivery truck/);
 const ids=await page.locator('[id]').evaluateAll(elements=>elements.map(el=>el.id));
 expect(new Set(ids).size).toBe(ids.length);
 await page.getByRole('button',{name:'Step 2: Plan the installation'}).click();
 await expect(page.locator('#station-detail h3')).toHaveText('Plan the installation');
 await page.getByRole('button',{name:/Play trip/}).click();
 await expect.poll(()=>page.locator('#trip-progress').inputValue()).not.toBe('0');
 await page.getByRole('button',{name:/Pause trip/}).click();
 const paused=await page.locator('#trip-progress').inputValue();
 await page.waitForTimeout(250);
 expect(await page.locator('#trip-progress').inputValue()).toBe(paused);
 await page.locator('#trip-progress').fill('50');
 await expect(page.locator('#trip-distance')).toHaveText('6.2 km');
 await page.locator('#trip-progress').fill('100');
 await expect(page.locator('#trip-state')).toHaveText('Sample journey complete');
 await page.getByRole('button',{name:'Reset trip'}).click();
 await expect(page.locator('#trip-progress')).toHaveValue('0');
 expect(errors).toEqual([]);
});
test('reduced motion keeps scroll illustration still',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const start=await page.locator('#hero-marker').getAttribute('cy');
 await page.locator('#solutions').scrollIntoViewIfNeeded();
 expect(await page.locator('#hero-marker').getAttribute('cy')).toBe(start);
 await expect(page.locator('#trip-progress')).toHaveValue('0');
});
for(const width of [320,375,768,1024,1440])test(`responsive layout ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(width<=900){const menu=page.locator('.menu-toggle');await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.locator('nav').getByRole('link',{name:'Solutions',exact:true}).click();await expect(page).toHaveURL(/#solutions/);await expect(menu).toHaveAttribute('aria-expanded','false');await menu.click();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');}
 await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});
 await page.screenshot({path:`test-results/preview-${width}.png`,fullPage:true});
});

