class CheckOutPage
{
    constructor(page)
    {
        this.page=page;
        this.country=page.locator("[placeholder*='Country']");
        this.countryDropdown=page.locator(".ta-results");
        this.orderSubmitButton=page.locator(".action__submit");
    }
    async enterCountryName()
    {
       
        await this.countryDropdown.waitFor();
        const buttonCount1=await this.countryDropdown.locator("button").count();
        for(let i=0;i<buttonCount1;i++)
        {
            const text=await this.countryDropdown.locator("button").nth(i).textContent();
            if(text===" India")
            {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
    async submitOrder()
    {
        await this.orderSubmitButton.click();
    }
    async getOrderId()
    {
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId= await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent()
        return orderId;
    }
}
module.exports={CheckOutPage};