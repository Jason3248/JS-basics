export class EmailSender{
    sendEmail(order){
        console.log(`Your Order with id: ${order.id} has been confirmed.`);
    }
}