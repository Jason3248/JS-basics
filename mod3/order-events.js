import { EventEmitter } from 'node:events';

const order = {
id: 101,
customerName: 'Rahul',
productName: 'Wireless Mouse',
quantity: 2,
amount: 1200
};

const orderEvents = new EventEmitter();

orderEvents.on('orderPlaced', (order) => {
    console.log(`Order #${order.id} placed successfully.
Product: ${order.productName}.
Quantity: ${order.quantity}.
Total Amount: ${order.amount}`);
});

orderEvents.on('orderPlaced', (order) => console.log(`Order confirmation sent to ${order.customerName}`));

orderEvents.on('orderPlaced', (order) => console.log(`Inventory updated for ${order.productName}. Quantity reduced by ${order.quantity}`));

orderEvents.emit('orderPlaced', order);

orderEvents.on('orderCancelled', (order) => console.log(`Order #${order.id} has been cancelled.`));

orderEvents.on('orderCancelled', (order) => console.log(`Inventory restored for ${order.productName}`));

orderEvents.emit('orderCancelled', order);