import { Payment } from "./Payment.js";

export class UPIPayment{
    process(amount){
        console.log(`Processing order amount of ${amount} via UPI`);
    }
    refund(amount){
        console.log(`Refunded amount of ${amount} successfully`);
    }
}