"use-strict"

// in this example, we can see that this keyword will point to the object calling the method and that means the this keyword will not simply point at the object in which we wrote the method. 
const jonas = {
    year: 1991,
    calcAge: function () {
        console.log(this);
        //console.log(2037 - this.year)
    }
}

jonas.calcAge();

const matilda = {
    year: 2017,
}

console.log(this);

matilda.calcAge = jonas.calcAge;

matilda.calcAge();
console.log(this);

// objects are stored in the heap memory. object is an reference value type. The piece of memory in the call stack has a reference to the piece of memory in the heap which holds our jonas object thats why they called reference types. 

// when we declare variable as an object, an identifier is created that points to the piece of memory in the stack which in turns points to the piece of memory in the heap and that is where the object is stored. 