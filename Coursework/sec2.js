'use-strict'

// function terms 

function logger() {
    // function body
    console.log("HEY");
}

// calling / running / invoking function 
logger();

logger();

logger();

// function declarations - we simply use a function keyword to declare function like we declare variable.

// declaring function parameters - oranges, apple
function foodProcessor(apple, oranges) {
    console.log(apple, oranges);
    const juice = `juice with ${apple}'s and ${oranges}.`

    return juice;
}

// passing arguments to function
const appleJuice = foodProcessor(5, 0);

console.log(appleJuice);

// function declarations vs function expressions 


// function declarations 

// as we called function declarations before its defined. 
const age1 = calcAge(1997);


function calcAge(birthYear) {
    return 2037 - birthYear;
}

// function expressions 
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
} // the function part is an expression.. and expression produces values so we store it in calcAge2 variable. also in js a function is just a value. doesnt have a type

// note - function declarations can be called before defined in the code. 

const age2 = calcAge(1997)
console.log(age1, age2);


// arrow function - a shorter version of function expression therefore faster to write. have no this keyword 

const calcAge3 = birthYear => 2037 - birthYear;

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;

    return `${firstName} retires in ${retirement} years`;
}


calcAge3(1997);

yearsUntilRetirement(1997, "Pratik");

// **** functions ****

// assign - 1
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPortugal = describeCountry('Portugal', 10, 'Lisbon');
const descGermany = describeCountry('Germany', 83, 'Berlin');
const descFinland = describeCountry('Finland', 6, 'Helsinki');

console.log(descPortugal, descGermany, descFinland);

// assign - 2

function percentageOfWorld1(population) {
    return population / 7900 * 100;
}

const percentageOfWolrd2 = function (population) {
    return population / 7900 * 100;
}

const percentageOfWorld3 = population => population / 7900 * 100;


const chinaPopulation = percentageOfWorld1(1441);
const indiaPopulation = percentageOfWorld1(2441);
const japanPopulation = percentageOfWorld1(1000);
const seiraPopulation = percentageOfWolrd2(1441);
const seiraPopulation2 = percentageOfWorld3(1441);


console.log(chinaPopulation);
console.log(indiaPopulation);
console.log(japanPopulation);
console.log(seiraPopulation);
console.log(seiraPopulation2);

// assign - 3

const describePopulation = (country, population) => {
    const perPopulation = percentageOfWorld3(population);

    return `${country} has ${population} million people, which is about ${perPopulation} of the world`
}


console.log(describePopulation('india', 1441));

// Assign - 4 *Arrays*

const populations = [30, 40, 70, 80];

console.log(populations.length == 4 ? "has 4 values" : "dont have 4 values");

const percentages = [];

percentages.push(percentageOfWorld1(populations[0]));
percentages.push(percentageOfWorld1(populations[1]));
percentages.push(percentageOfWorld1(populations[2]));
percentages.push(percentageOfWorld1(populations[3]));


console.log(percentages);

// assign - 5

const neighbours = ['china', 'pakistan', "nepal", "burma"];

neighbours.push("Utopia");
neighbours.pop();

if (neighbours[0] === 'Germany' || neighbours[1] === 'Germany' || neighbours[2] === 'Germany' || neighbours[3] === 'Germany') {
    console.log("a central european country :D");
}
else {
    console.log("Probably not a central european country :D");
}

// or

if (!neighbours.includes("germany")) {
    console.log('Probably not a central European country :D');
}

// neighbours[3] = 'bangladesh';

// or

neighbours[neighbours.indexOf('burma')] = 'Bangladesh';

console.log(neighbours);

// *Assignment 6 Objects*

const myCountry = {
    country: 'India',
    capital: 'delhi',
    language: 'hindi',
    population: 6,
    neighbours,
    checkIsIsland: function () {
        // this.isIsland = this.neighbours ? true : false;
        this.isIsland = !Boolean(this.neighbours.length);
    },
    describe: function () {
        return `${this.country} has a ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`;
    }
}

// console.log(`${myCountry.country} has a ${myCountry.population} million ${myCountry.language}-speaking people, ${neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.checkIsIsland();

console.log(myCountry.describe());

console.log(myCountry);

myCountry.population = myCountry.population + 2;
myCountry['population'] = myCountry['population'] - 2;

// *Assign - 7 for loops*

for (let i = 1; i <= 50; i++) {
    //console.log(`Voter number ${i} is currently voting`);
}

// Assign 8 

const percentages2 = [];

for (i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
}

console.log(percentages2);

// Assign 9

// const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

// for (i = 0; i < listOfNeighbours.length; i++) {
//     if (listOfNeighbours[i].length > 1) {
//         console.log(`Neighbour: ${listOfNeighbours[i][0]}`);
//     }
// }

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'],
['Norway', 'Sweden', 'Russia']
];

for (i = 0; i < listOfNeighbours.length; i++) {
    for (j = 1; j < listOfNeighbours[i].length; j++) {
        console.log(`Neighbour of ${listOfNeighbours[i][0]} is ${listOfNeighbours[i][j]}`);
    }
}