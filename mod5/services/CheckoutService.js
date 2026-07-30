export class CheckoutService{
    constructor(paymentMethod){
        this.paymentMethod = paymentMethod;
    }
    checkout(order){
        if(typeof this.paymentMethod.refund !== "function"){
            throw new Error(`${this.paymentMethod.constructor.name} cannot be processed.`)
        }
        this.paymentMethod.process(order.orderTotal);
    }
}