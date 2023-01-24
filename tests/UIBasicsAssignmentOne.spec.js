const {test,expect}=require('@playwright/test')

test('Testcase to get all contents of matching locator',async ({page})=>
{
     await page.goto("https://rahulshettyacademy.com/client/");
     console.log(await page.title());
     
     const userName=page.locator('#userEmail');
     const passWord=page.locator('#userPassword');
     const signIn=page.locator('#login');
     const cardTitle=page.locator('.card-body b');


     await userName.type("tiwarigeeta75@yahoo.com");
     await passWord.type("Playwright@1409");
     await signIn.click();

     //service based application -API calls
     await page.waitForLoadState('networkidle');

     const allCardTitles=await cardTitle.allTextContents();
     console.log(allCardTitles);

});
test.only('Testcase End to end scenario to place order on ecommerce site',async ({page})=>
{
     //to block images
   //  page.route('**/*.{jpg,jpeg,png}',route=>route.abort());
     await page.goto("https://rahulshettyacademy.com/client/");
     console.log(await page.title());
     
     const emaildID="tiwarigeeta75@yahoo.com";
     const userName=page.locator('#userEmail');
     const passWord=page.locator('#userPassword');
     const signIn=page.locator('#login');
     const cartButton= await page.locator('[routerlink="/dashboard/cart"]');

     await userName.type(emaildID);
     await passWord.type("Playwright@1409");
     await signIn.click();

     //service based application -API calls
     await page.waitForLoadState('networkidle');

     const productName= "adidas original";
     const product=await page.locator('.card-body');
     const count=await product.count();
     
     for(let i=0; i<count; i++)
     {
          if(await product.nth(i).locator('b').textContent()===productName)
          {
               //add to cart
              await product.nth(i).locator('text= Add To Cart').click();
              break;
          }
     }
     await cartButton.click();
     await page.locator("div li").first().waitFor();
     const bool=await page.locator("h3:has-text('adidas original')").isVisible();
     expect(bool).toBeTruthy();

     const checkOutButton=page.locator("text='Checkout'");
     await checkOutButton.click();

     await page.locator("[placeholder*='Country']").type("ind",{delay:100});
     const dropdown=page.locator(".ta-results");
     await dropdown.waitFor();
     const buttonCount1=await dropdown.locator("button").count();
     for(let i=0;i<buttonCount1;i++)
     {
          const text=await dropdown.locator("button").nth(i).textContent();
          if(text===" India")
          {
               dropdown.locator("button").nth(i).click();
               break;
          }
     }
     //const receivedEmail=page.locator('.input.txt.text-validated.ng-pristine.ng-valid.ng-touched');
     //console.log("Email :",receivedEmail.textContent());
     
    // await expect(receivedEmail).toHaveText(emaildID);
     await page.locator(".action__submit").click();
     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
     const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
     console.log(orderId);

     await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();
     const orderTable=await page.locator("tbody tr");
     
     for(let i=0; i<await orderTable.count();i++)
     {
          const orderNumber=await orderTable.nth(i).locator("th").textContent();
          if(orderId.includes(orderNumber))
          {
               orderTable.nth(i).locator("button").first().click();
               break;
          }

     }
     const OrderCheckoutId=await page.locator(".col-text").textContent();
     expect(orderId.includes(OrderCheckoutId)).toBeTruthy();
     //await page.pause();
});