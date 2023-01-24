const {test,expect}=require('@playwright/test');
const { DashBoardPage } = require('../Pageobjects/DashBoardPage');
const { LoginPage } = require('../Pageobjects/LoginPage');
const { CartPage } = require('../Pageobjects/CartPage');
const { CheckOutPage } = require('../Pageobjects/CheckOutPage');
const {customtest}=require('../utils/test-base');

//JSON-->String-->JS object
const dataset=JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")));

for(const data of dataset)
{
     test.only(`Testcase place Order for ${data.productName}`,async ({page})=>
     {
          //to block images
          //  page.route('**/*.{jpg,jpeg,png}',route=>route.abort());
          //service based application -API calls
          await page.waitForLoadState('networkidle');

          const loginPage=new LoginPage(page);
          await loginPage.LandingPage();
          await loginPage.validateLogin(data.userName,data.passWord);

          //service based application -API calls
          await page.waitForLoadState('networkidle');

          const dashBoardPage=new DashBoardPage(page);
          await dashBoardPage.searchProductAddcart(data.productName); 
          await dashBoardPage.navigateToCartPage();
          //await page.pause();
     
          //service based application -API calls
          await page.waitForLoadState('networkidle');
          const cartPage=new CartPage(page);
          await cartPage.verifySelectedProduct(data.productName);
          await cartPage.navigateToCheckoutPage();
    
          //service based application -API calls
          await page.waitForLoadState('networkidle');
          const checkOutPage=new CheckOutPage(page);
          await checkOutPage.enterCountryName();
          await checkOutPage.submitOrder()
          const orderId=await checkOutPage.getOrderId();
          console.log(orderId);
     });
}
//Passing test data as fixutre by extending test annotation
customtest('Testcase place Order for',async ({page,testDataForOrder})=>
{
     //to block images
     //  page.route('**/*.{jpg,jpeg,png}',route=>route.abort());

     const loginPage=new LoginPage(page);
     await loginPage.LandingPage();
     await loginPage.validateLogin(testDataForOrder.userName,testDataForOrder.passWord);

     //service based application -API calls
     await page.waitForLoadState('networkidle');

     const dashBoardPage=new DashBoardPage(page);
     await dashBoardPage.searchProductAddcart(testDataForOrder.productName); 
     await dashBoardPage.navigateToCartPage();
});