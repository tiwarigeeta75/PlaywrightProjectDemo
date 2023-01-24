const base=require('@playwright/test');

exports.customtest=base.test.extend(
{
    testDataForOrder:{
        "userName" :"rishijaiswal15@gmail.com",
        "passWord": "Playwright@1512",
        "productName": "Zara Coat 4"
    }
})