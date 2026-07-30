import { OrderService } from "./services/OrderService.js";
import { OrderValidator } from "./validators/OrderValidator.js";
import { OrderCalculator } from "./calculators/OrderCalculator.js";
import { OrderRepository } from "./repositories/OrderRepository.js";
import { EmailNotification } from "./notifications/EmailNotification.js";
import { CheckoutService } from "./services/CheckoutService.js";
import { CardPayment } from "./payments/CardPayment.js";
import { CODPayment } from "./payments/CODPayment.js";
import { NotificationService } from "./services/NotificationService.js";
import { EmailSender } from "./senders/EmailSender.js";
import { OrderEmailService } from "./services/OrderEmailService.js";
import { SQLRepository } from "./repositories/SQLRepository.js";

const orderService = new OrderService(
    new OrderValidator(),
    new OrderCalculator(),
    new SQLRepository(),
    new EmailNotification()
);

    
const order1 = {
    id: 1,
    customerEmail: 'abc@gmail.com',
    items: [
        {
            name: "Bag",
            price: 500,
            quantity: 2
        },
        {
            name: "T-shirt",
            price: 100,
            quantity: 5
        }
    ]
};

const savedOrder = orderService.createOrder(order1);
console.log()
console.log("All orders in the repository: ", orderService.repository.findAll());

new CheckoutService(new CardPayment()).checkout(savedOrder);
new OrderEmailService(new EmailSender()).sendConfirmation(savedOrder);