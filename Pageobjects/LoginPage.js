class LoginPage
{
    constructor(page)
    {
        this.page=page;
        this.userName=page.locator('#userEmail');
        this.passWord=page.locator('#userPassword');
        this.signIn=page.locator('#login');
    }
    async validateLogin(userName,passWord)
    {

        await this.userName.type(userName);
        await this.passWord.type(passWord);
        await this.signIn.click();
        
    }
    async LandingPage()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}
module.exports={LoginPage};