export class OrderService{
    constructor(validator, calculator, repository, notification){
        this.validator = validator;
        this.calculator = calculator;
        this.repository = repository;
        this.notification = notification;
    }
    createOrder(order){
        this.validator.validate(order);
        const orderTotal = this.calculator.calculateTotal(order);
        const savedOrder = this.repository.save({...order, orderTotal});
        this.notification.send(savedOrder);
        return savedOrder;
    }
}