// ******** destructuring objects ********
const restaurant = {
    name: "classico italiano",
    location: "via angelo tavanti 23, firenze, Italy",
    categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
    starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
    mainMenu: ["Pizza", "Pasta", "Risotto"],
    openingHours: {
        thus: {
            open: 12,
            close: 22
        },
        fri: {
            open: 11,
            close: 23
        }, sat: {
            open: 0, // open 24 hour
            close: 24
        }
    },
    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex],this.mainMenu[mainIndex]]
    }
}

// coding practice for array destructuring.
let [main,,secondary] = restaurant.categories;

// switching variable values using destructring
[secondary,main] = [main,secondary];

// receive 2 return values from a function
const [starter,mainCourse] = restaurant.order(2,0);

// nested destructuring
const nested = [2,4,[5,6]];

const [i,,[j,k]] = nested;

// coding practice for object destructuring.
const {name, openingHours, categories} = restaurant;

const {name: restaurantName, openingHours: hours, categories: tag} = restaurant;

// default values
const {menuu = [], starterMenu: starters = [], } = restaurant;

// mutating variables while destructring object
let a1 = 111;
let b1 = 999;

const obj = {a1: 23, b1:7, c:14};

({a1,b1} = obj);

// nested objects

const {sat : {open: o,close: c}} = openingHours;

// SPREAD , because on RIGHT SIDE OF = 
const arr = [1, 2, ...[3, 4]];

// REST, because on left side of 
const [a, b, ...others] = [1, 2, 3, 4, 5];

const [pizza, Risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]

// objects 
const { satu, ...weekdays } = restaurant.openingHours;
// //console.log(weekdays);

// Functions

const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i]
}

add(2, 3);
add(1, 2, 3, 4, 5)

const x = [1, 2, 3, 4, 5];
add(...x);



// ******** Short circuting for && ********

// what is short circuting? - allows them to return a value without evaluating the whole expression. 

// it short circuits when the first value is falsy and then immediately returns that falsy value without even evaluating the second operand. when its truthy, it means that the evaluation continues and simply the last value is returned. we can use && operator to execute code in second operand if the first one is true. 

// ******** Short circuting for || ********

// it returns the first truthy value of all the operands or simply the last value if all of them are falsy. we can use or operator to set default values. 

// Nullish coalescing operator (??)

// Null and undefined (NOT 0 or ""). for this operator, the zero and empty string are not falsy value. and were instead truthy values. this operator works with the principle of nullish values. and only nullish values will short circut the valuation here. 

restaurant.numGuests = 10;

const guests = restaurant.numGuests || 10;
// console.log(guests);

// so only if this was null or undefined, only then the second operand here will be executed and returned. 

const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

const rest1 = {
    name: "Capri",
    numGuests: 0
}

const rest2 = {
    name: "LA Piazza",
    owner: "Giovanni Rossi"
}

// or assignment operator 

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||=10;
// rest2.numGuests ||=10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// //console.log(rest1);

// logical and (&&) assignment operator 

// we want to anonymise the names of the restaurant owner, so when there is currently is an owner, we want to basically replace the string with The string anonymous. 

//rest2.owner = rest2.owner && "<Anonymous>";

rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";
// console.log(rest1, rest2);



// optional chaining 

// approach 1
if(restaurant.openingHours && restaurant.openingHours.mon){
    // console.log(restaurant.openingHours.mon)
}


// approach 2 - with optional chaining - so only if the property before the question marks here exists, then that open property will be read from here, and if not then undefined will be returned. and exists here means the nullish concept that We already talked before, so property exists if its not null and not undefined. so if its zero or empty string, then it still Exists ofcourse. 
// //console.log(restaurant.openingHours.mon?.open);

// example

const days = ["mon", "tue", "wed", "thus", "fri", "sat", "sun"];

for(const day of days){
    const open = restaurant.openingHours[day]?.open ?? "its closed";
    // console.log("On "+day+" "+open);
}


// methods

// console.log(restaurant.order?.(0,1) ?? "Method does not exists")


// ** Sets **

// its just an collection of unique values. it can never have any duplicate. if u have an usecase wherein u want to know whether an certain value is in a set or not, use sets. or goal is to store values in order and retrieve it, then the best usecase is to just use array, Also when u need to manipulate a data a lot, because arrays has access to lot of great array methods that We gonna study a little bit later. 


// ** Maps **

// An map is an data structure that we can use to map values to keys. data is stored in key value pairs. keys can have any type. keys can be also huge. it can be array, object or another map even. 

// easiest way to create an map
const restM = new Map();

// set method returns the updated map
restM.set("name", "classico Italinao")
restM.set(1, "Firenze, Italy")
restM.set([1,2], "Test")
// console.log(restM.set(2, "Lisbon, Portugal"))

// we can also chain the next set 
restM.set("categories", ["a","b", "c"]).set("open", 11).set("close", 23).set(true, "we are open :D").set(false, "We are closed :(")

// we can also use the get method to read the data from the map. DATA TYPE MATTERS.
// console.log(restM.get("name"));
// console.log(restM.get(true));

const time = 21;
restM.get(time> restM.get("open") && time < restM.get("close"));


// check if map contains the certain keys
// console.log(restM.has("categories"))

// we can even delete elements based on the key
const array = [3,2]
restM.delete(2);
restM.size;
restM.set(array, "Array")
restM.set(4, "HEYYYYY")
//restM.clear();

// console.log(restM);

// without having to use set method if there are lot of values 

const question = new Map([["question", "What is the best programming language in The world ?"], [1, "c"], [2, "java"], [3, "Javascript"], ["correct", 3], [true, "Correct", false, "Try Again!"]])
// console.log(Object.entries(restaurant.openingHours));

// Convert Object to Map
const hoursMap = new Map(Object.entries(restaurant.openingHours));

// Maps are iterables. 
// Quiz App
for(const [key, value] of question){
    if(typeof key === "number"){
        // console.log(`Answer ${key}: ${value}`)
    }
}

const Answer = 3;
// console.log(question.get(question.get("correct") === Answer));

// convert map to an array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// summary: which data structure to use. 


///////////////////////////////////////
// Working With Strings - Part 1


const airline = "TAP Air Portugal";
const plane = "A320";

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airline.length);
// console.log('B737'.length);

// console.log(airline.indexOf("r "));
// console.log(airline.lastIndexOf('r'));

// Case sensitive
// console.log(airline.indexOf("Portugal"));

// console.log(airline.slice(1))
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));
// console.log(airline.slice(-2))
// console.log(airline.slice(1, -1));

// 1. we know the strings are just primitives, so why do they have methods? shouldnt method be available on objects, such As arrays. 

// 2. whenever we call A method on A string, javascript will automatically behind the scenes convert that string primitives, to a string object with the same content. and then on that objects where the methods are called. and this process is called boxing. 

// 3. and when The operation is done, the javascript will convert it into A regular string primitives. all string methods return primitives. 

// console.log(new String('jonas'));
// console.log(typeof new String('jonas'));

// console.log(typeof new String('jonas').slice(1));

///////////////////////////////////////
// Working With Strings - Part 2

const airlin = 'TAP Air Portugal';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plan = 'Airbus A320neo';
// console.log(plan.includes('A320'));
// console.log(plan.includes('Boeing'));
// console.log(plan.startsWith('Airb'));

if (plan.startsWith('Airbus') && plan.endsWith('neo')) {
//   console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();
  
    if (baggage.includes('knife') || baggage.includes('gun')) {
    //   console.log('You are NOT allowed on board');
    } else {
    //   console.log('Welcome aboard!');
    }
  };
  
  checkBaggage('I have a laptop, some Food and a pocket Knife');
  checkBaggage('Socks and camera');
  checkBaggage('Got some snacks and a gun for protection');

///////////////////////////////////////
// Working With Strings - Part 3

// Split and join
// console.log('a+very+nice+string'.split('+'));
// console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);


const capitalizeName = (name) => {
    let names = name.split(" ");
    const namesUpper = []; 
    for(const n of names){
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    // console.log(namesUpper.join(" "))
}

capitalizeName("pratik aswani");

// Padding
const message = 'Go to gate 23!';
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

// console.log(maskCreditCard(64637836));
// console.log(maskCreditCard(43378463864647384));
// console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
// console.log(message2.repeat(5));

const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

