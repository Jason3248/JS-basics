import { Payment } from "./Payment.js";

export class NetBankingPayment extends Payment{
    process(amount){
        console.log(`Processing amount of ${amount} via Net Banking`);
    }
    refund(amount){
        console.log(`Refunded amount of ${amount} successfully`);
    }
}
