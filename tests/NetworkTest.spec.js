const{test,expect,request}=require('@playwright/test')
const {APIUtils}=require('../utils/APIUtils')

const loginPayload={userEmail: "tiwarigeeta75@yahoo.com",userPassword: "Playwright@1409"}
const createOrderPayload={orders: [{country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa"}]}

let response;
const fakePayloadOrders={data:[],Message:"No Orders"}


test.beforeAll(async ()=>
{
    //set context
    const apiContext= await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(createOrderPayload);
});
test('Testcase intercept my order response',async ({page})=>
{ 
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)  
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63b7add3568c3e9fb1ede50f",
    async route=>
    {
        const response=await page.request.fetch(route.request());
        let body=JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body,
            })
    });

    console.log(await page.title());
    
    //service based application -API calls

    await page.waitForLoadState('networkidle');
    //await page.pause();
     await page.locator("button[routerlink*='myorders']").click();
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63b7add3568c3e9fb1ede50f");
});
