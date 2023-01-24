const {expect} = require('@playwright/test')

class CartPage
{
    constructor(page)
    {
        this.page=page;
        this.checkOutButton=page.locator("text='Checkout'");
        this.firstProduct=page.locator("div li").first();
    }
    async verifySelectedProduct(productName)
    {
        await this.page.waitForLoadState('networkidle');
        await this.firstProduct.waitFor();
        const bool=await this.page.locator("h3:has-text('"+productName+"')").isVisible();
        expect(bool).toBeTruthy();
       // this.page.pause();
    }
    async navigateToCheckoutPage()
    {
        await this.checkOutButton.click();

    }
}
module.exports={CartPage};