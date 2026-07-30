export class OrderCalculator{    
    calculateTotal(order){
        return order.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }
}
