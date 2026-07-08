const db = require("./db");


function fetchProductsFromDatabase(){
    const promise = new Promise((resolve, reject) => {
        let result = [];
        setTimeout(() => {
            result = [...db];
            if(result.length < 0){
            reject("No Products Available");
            }
        resolve(result);
        }, 3000);

    });
    return promise;
}


const fetchedProducts = fetchProductsFromDatabase();
fetchedProducts.then((result) => {
    console.log(result);
})



async function generateInventoryReport(){
    try {
            let totalProducts = 0;
            let inStockProducts = 0;
            let totalInventoryValue = 0;
            const products = await fetchedProducts;
            totalProducts = products.length;
            for(product of products){
                if(product.stock > 0) inStockProducts++;
                totalInventoryValue += (product.price * product.stock);
            }
            console.log("Total no of products: ", totalProducts);
            console.log("Total in-stock products: ", inStockProducts);
            console.log("Total inventory value", totalInventoryValue);
    } 
    catch (error) 
    {
            console.error("Server not available", error);
    }
}

generateInventoryReport();