export class SQLRepository{
    constructor(){
        this.data = [];
    }

    findById(orderId){
        return this.data.find(order => order.id === orderId); 
    }

    save(order){
        this.data.push(order);
    }
}