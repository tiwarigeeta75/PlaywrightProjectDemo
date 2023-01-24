class APIUtils
{
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken()
    {
        const loiginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayload
        });
        const loginResponseJson=await loiginResponse.json();
        const token=loginResponseJson.token;
        console.log(token);
        return token;
    }
    async createOrder(createOrderPayload)
    {
        let response={};
        response.token=await this.getToken();
        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:createOrderPayload,
            headers:{
                 'Authorization': response.token,
                 'Content-Type':'application/json'
                },
        })
        const orderJsonResponse=await orderResponse.json();
        console.log(orderJsonResponse);
        const orderId=orderJsonResponse.orders[0];
        response.orderId=orderId;
        console.log(orderId); 
        return response;
    }
}
module.exports={APIUtils};