const{test,expect}=require('@playwright/test')

test("UIValidation hidden field & assertion",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

});
test("UIValidation Java script popups",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const frame=page.frameLocator("#courses-iframe");
    frame.locator("li a[href*='lifetime-access']:visible").click();
    const heading=await frame.locator(".text h2").textContent();
    console.log(heading.split(" ")[1]);
    //await page.pause();
    
});
test("Screenshots & Visual comparison",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    
    //partial screenshot at locator level
    await page.locator('#displayed-text').screenshot({path: 'screenshot1.png'});
    await page.locator("#hide-textbox").click();

    //complete page screenshots
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

});
test.only("Visual testing",async({page})=>
{
    
    await page.goto("https://flightware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');

});