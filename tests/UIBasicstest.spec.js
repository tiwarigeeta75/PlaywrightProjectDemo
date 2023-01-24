const {test,expect}=require('@playwright/test')

test('Browser context Playwright test',async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();

    

    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});
test('Valid login Page Playwright test',async ({page})=>
{
     await page.goto("https://www.yahoo.com");
     console.log(await page.title());
     await expect(page).toHaveTitle("Yahoo | Mail, Weather, Search, Politics, News, Finance, Sport & Videos");
     await page.locator('a._yb_rvae7').click();
     await page.locator('#login-username').type("tiwarigeeta75");
     await page.locator("[value='Next']").click();
     await page.locator('#login-passwd').type("Vibration@9");
     await page.locator("[value='Next']").click();
     
});
test('Invalid login Page Playwright test',async ({page})=>
{
     await page.goto("https://www.yahoo.com");
     console.log(await page.title());
     await page.locator('a._yb_rvae7').click();
     await page.locator('#login-username').type("tiweta");
     await page.locator("[value='Next']").click();
     const errorMessage=page.locator('#username-error');
     console.log(errorMessage.textContent());
     console.log(errorMessage);
     await expect(errorMessage).toContainText('Sorry');
});

test('Testcase one',async ({page})=>
{
    //to block css
    //page.route('**/*.css',route=>route.abort());
  
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     await page.locator('#username').type("rahulshettyacademy");
     await page.locator('#password').type("learning");
     await page.locator("[name= 'signin']").click();

     console.log(await page.locator('.card-body a').first().textContent());
     console.log(await page.locator('.card-body a').nth(1).textContent());
});

test('Testcase to get all contents of matching locator',async ({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     
     const userName=page.locator('#username');
     const passWord=page.locator('#password');
     const signIn=page.locator("[name= 'signin']");
     const cardTitle=page.locator('.card-body a');


     await userName.type("rahulshettyacademy");
     await passWord.type("learning");
     
     //Race condition- to  not allow until promise steps return successful.the below 2 steps are wrapped together
     await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
     );

     //console.log(await cardTitle.first().textContent());
     //console.log(await cardTitle.nth(1).textContent());

     const allCardTitles=await cardTitle.allTextContents();
     console.log(allCardTitles);

});

test('Testcase UI control dropdown,radiobutton, checkboxes',async ({page})=>
{

   
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     
     const userName=page.locator('#username');
     const passWord=page.locator('#password');
     const signIn=page.locator("[name= 'signin']");
    
     await userName.type("rahulshettyacademy");
     await passWord.type("learning");

    const dropdown= await page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();

    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').check();
    
    await expect(page.locator('#terms')).toBeChecked();

    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //await  page.pause();
    await signIn.click();
});

test('Testcase blinking text',async ({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     
     const userName=page.locator('#username');
     const passWord=page.locator('#password');
     const signIn=page.locator("[name= 'signin']");
    
     await userName.type("rahulshettyacademy");
     await passWord.type("learning");

     const blinkingText=page.locator('[href*=documents-request]');
     await expect(blinkingText).toHaveAttribute("class","blinkingText");
     
    //await  page.pause();
    await signIn.click();
});

test('Testcase moving to new child window',async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const blinkingText=page.locator('[href*=documents-request]');
    const [newPage] =await Promise.all(
        [
            context.waitForEvent('page'),
            blinkingText.click(),
        ]

    )
    const text=await newPage.locator('.red').textContent();
    const textArray=text.split("@");
    const email=textArray[1].split(" ")[0];


    console.log(text);
    console.log(email);

    console.log(await page.title());
     
    const userName=page.locator('#username');
    const passWord=page.locator('#password');
    const signIn=page.locator("[name= 'signin']");
    
    await userName.type(email);
 
    await passWord.type("learning");
    await page.pause();
    await signIn.click();
});
