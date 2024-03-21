///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function(dogsJulia, dogsKate){
    const dogsJuliasCorrected = dogsJulia.slice();
    dogsJuliasCorrected.splice(0,1)
    dogsJuliasCorrected.splice(-2)   
    const dogs = dogsJuliasCorrected.concat(dogsKate);
    dogs.forEach(function(data,index) {
        data >= 3 ? console.log(`Dog Number ${index+1} is an adult and is ${data} years old`):console.log(`Dog Number ${index+1} is an puppy and is ${data} years old`)
    })
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

///////////////////////////////////////
// Coding Challenge #2

const calcAvgHumanAge = (ages) => {
    // calculating average human age from all adult dogs

    // 1. First step was to calculate dog age in human age by using formula i.e age <= 2 -> 2 * age or else 16+age*4
    // 2. Second step Was to excuding all dog ages which are less than 18 years old
    // 3. Calculate Avg human age from all adult dogs

    let arrLen = 0;
    const avgHumanAge = ages.map((age)=> age<=2 ? 2 * age : 16 + age * 4).filter((age) =>  age >= 18).reduce((acc,age,index,arr) => {
        arrLen = arr.length;
        return acc+age
    });
    
    console.log("Average Human Age of all dogs = "+ avgHumanAge / arrLen)
}

calcAvgHumanAge([5,2,4,1,15,8,3])