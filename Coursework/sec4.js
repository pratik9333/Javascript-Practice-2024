"use-strict"

// Default Parameters

const bookings = [];

const createBooking = function(flightName, numPassangers = 1, price = 199 * numPassangers){
    const booking = {
        flightName,
        numPassangers,
        price
    }
    bookings.push(booking);
}

createBooking("LH123")
createBooking("LH123", 2, 180)
createBooking("LH123", 2)

// if u Want to leave certain parameters, we can set that left value with undefined.
createBooking("LH123", undefined, 1000)

createBooking("LH123", 2)

// How Passing Arguments Works. Value vs Reference
// Note - JS does not have passing by reference, we just pass a reference to the function but we do not pass by reference. 
let flightNum = "LH234";
let jonas = {
    name: "Pratik Aswani",
    passport: 24739479284
}

const checkIn = function(flightNum, passenger){
    flightNum = "LH999"
    passenger.name = "MR. " + passenger.name

    if(passenger.passport === 24739479284){
        console.log("checked In")
    }
    else{
        console.log("Wrong Passport")
    }
}

checkIn(flightNum, {...jonas})

// pass by value And passing reference i.e jonas obj. 
console.log(flightNum, jonas);

// First Class and Higher Order Functions

// JS treats functions as first class citizens. This means that function are just values. Functions are just another type of object. 

// Higher order functions - a function that receives another function As an argument, that returns a new function or both. this is only possible because of first class functions. 

// Functions Accepting Callback Functions
const onwWord = function(str){
    return str.replace(/ /g, "").toLowerCase();
}

const upperFirstWord = function(str){
    const [firstWord, ...other] = str.split(" ");

    return [firstWord.toUpperCase(), ...other].join(" ");
}

// Higher Order Function because it Takes in function. 
const transformer = function(str, fn){
    console.log("Orignal String"+ str);
    console.log("Transformed String:"+fn(str))
    console.log("Transformed By: "+fn.name);
}

                                       
transformer("Javascript is the best!", upperFirstWord); // Callback Function i.e upperFirstWord

// Functions Returning Functions

const greet = greeting => name => console.log(greeting, name);

// greet returns function, so we are calling that returned function.
// like this where we directly call function when it got returned by function which is -> greet("hey")
greet("Hey")("Pratik");

// or by passing it onto variable
const greeterHey = greet("Hey");

// and calling later
greeterHey("Sahil");

// Call and Apply Methods.

const lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],

    book(flightNum, name){
        console.log(name+" Booked a seat on "+this.airline+" flight "+this.iataCode+flightNum);
        console.log(name);
        this.bookings.push({flight: "LH"+flightNum, name})
    }
}

const book = lufthansa.book;

book.call(lufthansa, 223, "Pratik Aswani")

const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],
    // now here we need that same book function that is defined in lufthansa obj.
}
// contd.. one way is to create a seperate common function for both objects. 
// and then calling this book function for eurowings obj. 
// book("Isha Ambani", 223) // wont work as the this keyword in book func now points to global obj and not to eurowings or lufthansa obj. we need to manually modify this keyword whenever we want this keyword points to certain object in different cases. for that we got different function methods like call, apply and bind. 

// we did not call the book function itself, instead we call the (call method) and then this call method which will call the book function with the this method set to (eurowings). this allows us to manually or explicitly set the this keyword of any function that we want to call. 
book.call(eurowings, 223, "Pratik Aswani")

// Bind method - also allows us to manually set this keyword to any function call. difference is that it does not immediately call the bind function, instead it returns the new function where the this keyword is bound. 

const bookEW = book.bind(eurowings);
bookEW(221, "PRatik Sir")

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function (){
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Closures

// a closure makes a function remember all the variables that existed at the functions birth place even if its parent function have removed from call stack earlier. 

// any function always has access to variable environment of the execution context in which the function Was created. 

const secureBooking = function(){
    let passengerCount = 0;

    return function(){
        passengerCount++;
        console.log(passengerCount+" passengers")
    }
}

// now in the case of booker, the function Was created/born in the execution context of the secure booking, therefore the booker function will get access to secureBooking fn variable environment and thus to variable i.e passengerCount. and this is an example of how closures created. 

// closure - VE attached to the function, exactly as it was at the time and place the function Was created. 

// booker function has access to passengerCount variable because it is defined in The scope in which the booker function was actually created. so in A sense, a scope chain was actually preserved through the closure even if the scope has already been destroyed because its execution context has gone. but somehow variable environment has been preserved somewhere in the engine. 

// thanks to the closure, a function does not loose the connection to variables that existed during the functions birth place. 

// closure has the priority over the scope chain.

// some more definations of closures. 

// 1. A closure is the closed over variable environment of the execution context in which the function was created, even after that execution context is gone. 

// 2. A closure gives a function access to all the variables of its parent function, even after that parent function is returned. The function keeps an refrence to its outer scope, which also preserves the scope chain throughout the time. 

// 3. A closure makes sure that a function doesnt loose connection to variables that existed at the functions birth place.

// Note - We do not have to manually create closures, this is a javascript feature that happens automatically. we cant even access closed over variables explicitly. A closure is not an tangible javascript object. 

//const booker = secureBooking();