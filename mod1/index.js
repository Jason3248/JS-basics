//variables - let and const

// console.log("Hello world");

// const a = 10;
// let b;
// b = 10;
// b = 20;
// console.log(b);


//functions

//function
function calculateTax(amount, taxPercentage){
    return amount * (taxPercentage/100);
}

console.log(calculateTax(100, 10));

//function expression
const calculateTaxExp = function(amount, taxPercentage){
    return amount * (taxPercentage/100);
}

console.log(calculateTaxExp(2000, 20));

//arrow function
const calculateTaxArr = (amount, taxPercentage) => amount * (taxPercentage/100);

console.log(calculateTaxArr(10000, 10));

//default parameter function
function getObject(name, userType="Regular"){
    return {
        userName: name,
        userType
    };
}

console.log(getObject("user1"));
console.log(getObject("user2", "admin"));


//rest operator parameter function
function calculateSum(...nums){
    // let sum = 0;
    // for(let i = 0 ; i < nums.length ; i++){
    //     sum += nums[i];
    // }
    // return sum;

    return nums.reduce((sum, curr) => {
        return sum + curr;
    }, 0);
}
console.log(calculateSum(1, 2, 3, 4, 5));



//callback

function printuserDetails(callback){
    const userDetails = {
        name: "user1",
        age: 21
    };
    callback(userDetails)
}

printuserDetails((data) => console.log("userDetails: ", data));

// array functions

const num = [2, 3, 4, 5, 6, 7];

let sum = 0;
num.forEach((num) => sum += num);
console.log(sum)


console.log(num.reduce((sum, curr) => {
    console.log(sum , curr)
    return sum - 1
}))

const numSquare = num.map((num) => num ** 2);
console.log(numSquare)

const divisibleByTwo = num.filter((num) => num % 2 === 0);
console.log(divisibleByTwo);

console.log(num.find((num) => num > 3));

const sortedNum = num.sort((a, b) => a - b);
console.log(sortedNum);

const sortedDescNum = num.sort((a, b) => b - a);
console.log(sortedDescNum);

console.log(num.every((num) => num > 2));

console.log(num.some((num) => num > 0));

//spread operator

const newNum = [...num, 100, 200, 500];

const uniqueElements = [...new Set(num)]

console.log(uniqueElements);


num.splice(0, 0, 100, 200, 300);//adding element at a particular index

console.log(num);
const newArray = num.splice(1, 3); //deleting elements at a particular index
console.log(newArray);
console.log(num);


const orders = [
    {
        id: 1,
        product: "Laptop",
        quantity: 2,
        price: 1000
    },
    {
        id: 2,
        product: "Mobile",
        quantity: 3,
        price: 700
    },
    {
        id: 3,
        product: "IPad",
        quantity: 4,
        price: 600
    }];

//map - transforms the existing elements of the array
const ordersPriceList = orders.map((order) => order.price);
console.log(ordersPriceList);


const newOrders = orders.map(order => {
    return {
        ...order, 
        totalPrice: order.price * order.quantity
    }
})
console.log(newOrders);


//find total price of all orders

const totalOrdersPrice = newOrders.reduce((sum, curr) => {
    return sum + curr.totalPrice;
}, 0);

console.log(totalOrdersPrice);



//destructuring of objects

let userDetails = {
    name: "user1",
    type: "regular",
    age: 0
};

const {name, type, age} = userDetails;
console.log(name);

const {name:userName} = userDetails;
console.log(userName);



//add the isActive and role to user

userDetails = {...userDetails, role: "Admin", isActive: true};
console.log(userDetails);


userDetails.gender = "male";


//nullish coalescing

const userAge = userDetails.batch ??  0;
console.log(userAge);

// || - checks if the value is falsy 
// ?? checks if the value is null/undefined.


//importing and exporting
import {add, subtract, multiply} from './mathUtil.js';
console.log(add(2, 3));



//Promises

function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isServerAvailable = true;
            if(isServerAvailable){
                resolve({id: 1, name: "user1"});
            }
            reject(new Error('Server is unavailable'));
        }, 5000);   
    })
}


fetchData()
.then(data => console.log(data))
.catch(error => console.log(error.message))





//fetch api

const fetchPostData = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if(!response.ok){
            throw new Error('Response not received');
        }
        return response.json();
    })
}

const fetchUserData = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if(!response.ok){
            throw new Error('Response not received');
        }
        return response.json();
    })
}

fetchPostData()
.then(data => console.log(data.slice(0, 5)))
.catch(error => console.log(error.message));

const fetchError = () => {
    return new Error('new error')
};



//promise chaining
fetchUserData()
.then(data => {
    console.log(data);
    return fetchPostData()
}
).then(data => {
    console.log(data)
}
)



