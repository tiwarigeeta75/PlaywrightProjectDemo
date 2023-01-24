const{test,expect,request}=require('@playwright/test')
const {APIUtils}=require('../utils/APIUtils')

const loginPayload={
    userEmail: "tiwarigeeta75@yahoo.com",
    userPassword: "Playwright@1409"
}

const createOrderPayload={
    orders: [{country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa"}]
}
let response;

test.beforeAll(async ()=>
{
    //set context
    const apiContext= await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(createOrderPayload);
});
test('Testcase End to end scenario to place order with API',async ({page})=>
{ 
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)  
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    
    //service based application -API calls

    await page.waitForLoadState('networkidle');

     await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();
     const orderTable=await page.locator("tbody tr");
     
     for(let i=0; i<await orderTable.count();i++)
     {
          const orderNumber=await orderTable.nth(i).locator("th").textContent();
          if(response.orderId.includes(orderNumber))
          {
               orderTable.nth(i).locator("button").first().click();
               break;
          }

     }
     const OrderCheckoutId=await page.locator(".col-text").textContent();
     expect(response.orderId.includes(OrderCheckoutId)).toBeTruthy();
     
});
