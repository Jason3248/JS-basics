export class OrderValidator{
    validate(order){
        if(!order.customerEmail) throw new Error("Customer email is required");
        if(!Array.isArray(order.items) || order.items.length === 0) throw new Error("At least one item required to place order.");
        order.items.forEach((item,	idx)	=>	{
            if(!item.name)	throw new Error(`Item name required at index: ${idx}`);
            if(item.price <= 0)	throw new Error(`Item price invalid at index : ${idx}`);
            if(item.quantity <=	0)	throw new Error(`Item quantity invalid at index: ${idx}`);
        });
    }
}

