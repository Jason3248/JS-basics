import { Payment } from "./Payment.js";

export class CardPayment{
    process(amount){
        console.log(`Processing total order amount : ${amount} via Card`);
    }
    refund(amount){
        console.log(`Refunded amount of ${amount} successfully`);
    }
}