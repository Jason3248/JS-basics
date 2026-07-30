import { Payment } from "./Payment.js";

export class CODPayment{
    process(amount){
        console.log(`Processing total order amount : ${amount} via COD`);
    }
}