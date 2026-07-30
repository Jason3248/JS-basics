export class OrderEmailService{
    constructor(emailSender){
        if(typeof emailSender.sendEmail !== "function"){
            throw new Error("emailsender must implement sendEmail(message)");
        }
        this.emailSender = emailSender;
    }
    sendConfirmation(order){
        this.emailSender.sendEmail(order);
    }
}