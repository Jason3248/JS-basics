export class NotificationService{
    constructor(serviceType){
        this.serviceType = serviceType;
    }
    
    sendConfirmation(){
        this.serviceType.send("message");
    }
}