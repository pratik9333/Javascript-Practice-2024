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