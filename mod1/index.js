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

function printDetails(callback){
    const details = {
        name: "user1",
        age: 21
    };
    callback(details)
}

printDetails((data) => console.log("Details: ", data));

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