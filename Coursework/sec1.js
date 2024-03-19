// lec 1
const country = "India", continent = "Asia";
let population = 3400000;
//console.log(country, continent, population);

//lec 2
const isIsland = false;
let language = "Hindi";
//console.log(typeof isIsland, typeof population, typeof country, typeof language);

// lec 3
language = "English";
// isIsland = true; cannot reassign value to constant variable 
//console.log(typeof isIsland, typeof population, typeof country, typeof language);


// lec 4
const halfOfPopulation = population / 2;
const finland = 6000000;
const averagePopulation = 33000000;

population += 1;
if (population > finland) {
    console.log(`${country} population is greater than ${finland}`);
}
else {
    console.log(`${country} population ${population} is less than finlands population which has ${finland}`);
}

if (averagePopulation > population) {
    console.log(`${country} population which has ${population} is less than average population which is ${averagePopulation}`);
}

const description = `${country} is in ${continent}, and its ${population} people speak ${language}`;

console.log(description);

// lec 5

if (population > 33000000) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s population is ${33000000 - population} million below average`);
}

// lec 6 

console.log('9' - '5'); // -> ? 4
console.log('19' - '13' + '17'); // -> 617
console.log('19' - '13' + 17); // -> 23
console.log('123' < 57); // -> false
console.log(5 + 6 + '4' + 9 - 4 - 2); // -> 117

// lec 7

// let numNeighbours = Number(prompt('How many neighbour countries does your contry have?'));
if (numNeighbours === 1) console.log("Only 1 border");
else if (numNeighbours > 1) console.log("More Than 1");
else console.log("No Numbers ");

// lec 8 

if (population < 50 && language === "English" && !isIsland) {
    console.log(`You should live in a ${country}`);
}
else {
    console.log(`You should not live in a ${country}`);
}

// lec 10

console.log(population > 33 ? `${country} population is above average` : `${country} population is below average`);