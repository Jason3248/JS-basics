export class EmailNotification{
    send(order){
        console.log(`Order Confirmation E-mail sent to ${order.customerEmail}`);
    }
}