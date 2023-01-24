class DashBoardPage
{
    constructor(page)
    {
        this.page=page;
        this.cartButton=page.locator('[routerlink="/dashboard/cart"]');
        this.product= page.locator('.card-body');
        this.cardTitle=page.locator('.card-body b');
    }
    async searchProductAddcart(productName)
    {
        const allCardTitles=await this.cardTitle.allTextContents();
        console.log(allCardTitles);
        const count=await this.product.count();
        for(let i=0; i<count; i++)
        {
          if(await this.product.nth(i).locator('b').textContent()===productName)
          {
               //add to cart
              await this.product.nth(i).locator('text= Add To Cart').click();
              break;  
          }
        }
    }
    async navigateToCartPage()
    {
        await this.cartButton.click();
    }   
}
module.exports={DashBoardPage};