// forEach Loop

// It is an higher order function which requires the callback function in order to tell it what to do. 

/* When exactly the foreach calls this callback function? 
It loops over the array and in each iteration it will execute this callback function here. also the foreach method calls this callback function in each iteration, it will pass the current element of array as an argument. 

Note - continue and break statements do not work in forEach loop. 
*/

const movement = [250, -100, 120, -140, 1220, 121, -22];

movement.forEach((movement, index) => {
    if(movement > 0){
        console.log(index+1+" you deposited "+movement);
    }
    else{
        console.log(index+1+" you withdrew "+Math.abs(movement));
    }
})

// forEach Loop with map and sets

// map
const currencies = new Map([
    ["USD", "United States Dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound Sterling"]
])

currencies.forEach(function(value, key, map){
    console.log(value+" "+key);
})

// sets
const uniqueCurrencies = new Set(["USD", "EUR", "GBP", "GBP", "USD", "EUR"])

// doesnt have the key, so it replaces that parameter with set value. 
uniqueCurrencies.forEach(function(value,value,set){
    console.log(value+" "+value);
})

// map -> It returns the new array containing the results of applying an operation on all orignal array elements. or Used to loop over arrays, but, unlike foreach, the map method will give us A new array, this new array will contain in each position the results of applying an callback function to the orignal Array elements. 

const eurToUsd = 1.1;

// Note - All we do here is to pass this callback function into The map method, but we do not call this function by ourselves, it is the map method who will call this function for each of the array elements in the movement array.

// -> Side Effects means in other words do some work without returning anything. 

const movToUsd = movement.map((mov) => mov * eurToUsd);
const movementDesc = movement.map((mov,index) => `Movement ${index+1}: you ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`)


// filter -> Is used to filter for elements in the orignal array which satisfies a certain condition. or It returns the new array containing the array elements that passed an specified test condition. 

// Reduce -> The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

// Note -> The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).

const array1 = [1, 2, 3, 4];

/*
first iteration 1, 2 i.e 1+2 -> 3
second iteration 3, 3 i.e 3+3 -> 6
third iteration 6, 4 i.e 6+4 -> 10
*/
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => {
    console.log(accumulator, currentValue);
    return accumulator + currentValue
  });

console.log(sumWithInitial);
// Expected output: 10

// How reduce() works without an initial value
const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer);

/*
op
accumulator	currentValue	index	Return value
First call	15	16	1	31
Second call	31	17	2	48
Third call	48	18	3	66
Fourth call	66	19	4	85

*/

// How reduce() works with an initial value

[15, 16, 17, 18, 19].reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    10,
  );

/*
op
accumulator	currentValue	index	Return value
First call	10	15	0	25
Second call	25	16	1	41
Third call	41	17	2	58
Fourth call	58	18	3	76
Fifth call	76	19	4	95
*/

// Maximum Value

const maxValue = [250, -100, 120, -140, 1220, 121, -22].reduce((acc, mov) => acc > mov ? acc : mov)
console.log(maxValue);

/*
op
accumulator currentValue Return value
First call	250 -100 250
Second call	250	-120 250
Third call	250	140	250
Fourth call	250	-1220 1220
Fifth call	1220 121 1220
sixth call	1220 -22 1220
*/

// Through find method, you can retrive one element from The array if a condition passes. It Loops over the array.

// **** Fundamental difference between find and filter method are ****

// 1. Filter method retrieves all the element from the array if a certain condition passes whereas find method just retrieve first element. 
// 2. Filter retrieves element in form of array elements, whereas the find method retrieve only one single element. 

const withdrawl = movement.find(mov => mov < 0);

//[250, -100, 120, -140, 1220, 121, -22];
console.log(withdrawl);
// op
//-100

// Array Methods Practice

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// 1.
const bankDepositsTotal = accounts.flatMap((acc) => acc.movements).filter((mov) => mov > 0).reduce((acc, mov) => acc + mov);

console.log("Total = "+bankDepositsTotal);

// 2.
// const numDeposits1000 = accounts.flatMap((acc) => acc.movements).filter((amount) => amount >= 1000);

// using reduce

const numDeposits1000 = accounts.flatMap((acc) => acc.movements).reduce((acc,cur) => (cur >= 1000 ? acc + 1 : acc),0);

console.log(numDeposits1000);

// 3.

/* expected output

{
  sumOfDeposits : "value",
  sumOfWithdrawls: "value"
}
*/

const {deposits, withdrawls} = accounts.flatMap((acc) => acc.movements).reduce((sums, cur) => {
  cur > 0 ? (sums.deposits += cur) : (sums.withdrawls+=cur);
  return sums;
}, {deposits: 0, withdrawls: 0});

console.log(deposits,withdrawls);


// 4.

const convertTitleCase = (str) => {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  return str.toLowerCase().split(" ").map((word) => exceptions.includes(word) ? word:`${word[0].toUpperCase()}${word.slice(1)}`).join(" ")
}

console.log(convertTitleCase("This is the an but or on nice example DUDE BRO IN the CHAIR"))

// Creating Dates Object
const now = new Date();

// parsing Date
console.log(new Date('December 15, 2024'))