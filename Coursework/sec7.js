// Constructor functions and new operator

// Note - We can use constructor functions to built the object using the function. A constructor function is a completely normal function. Diff is we call constructor function with new operator.

const Person = function (firstName, birthYear) {
  // Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function(){
  //     console.log(2037 - this.birthYear)
  // }
};

// Behind the scenes when calling this constructor function with new keyword
// 1. new {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const jonas = new Person("jonas", 1991);
const jay = "jay";
console.log(jonas);
console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); //  false. because we didnt created this variable here or the object using any constructor function.

// Prototypes. How prototype, prototype inheritance and deligation works?

// 1. Each and every function in the javascript automatically has a property called prototype and also the constructor functions.
// 2. Every object that got created by certain constructor functions will get Access / Inherit to all the methods and properties that we defined on the constructors prototype property.
// 3. eg - Person.prototype //prototype property of constructor function.

// Only one copy of this function exists. All objects that are created using the "Person" constructor function Can basically reuse this function on themselves.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // this keyword is set to object Calling the method.
};
Person.prototype.species = "Homo Sapiens";

jonas.calcAge(); //46

// NOTE - We can access the calcAge function on the jonas object even tho its not really on the object itself because of prototypal inheritance and prototype of jonas is Person.prototype.

// Person.prototype is not the prototype of function. but instead it is what gonna be used as the prototype of all the objects that are created with The Person constructor function. imp difference
console.log(jonas.__proto__ === Person.prototype); // true.
console.log(Person.prototype.isPrototypeOf(jonas)); // true.
console.log(Person.prototype.isPrototypeOf(Person)); // true.

// Where does this __proto__ property here in the jonas object comes from?
// ans - goto step 3 of Behind the scenes when Calling constructor.. it creates __proto__ property  and it sets its value to the prototype property to the function that is been Called.

// jonas is connected to prototype and the ability of looking up methods and properties in a prototype is what we call prototype chain. Also we say its an series of links between objects, linked through prototypes. Its similar to the scope chain but with prototypes.

// In the scope, whenever javascript cant find a certain variable in a certain scope, it looks up in the next scope in the scope chain, and tries to find the variable there. Similarly..

// cont.. in the prototype chain, whenever javascript cant find a certain property or a method in a certain object, its gonna look up into the next prototype in The prototype chain and see if it can find it there.

console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false

// Doubts

// 1. Person {firstName: 'jonas', birthYear: 2011}. why Person behind the object.

// what is strange Constructor function in prototype property of objects.

// Prototypal inheritance and prototype Chain

// Revision notes

// -> A constructor has a prototype property which is an object and inside that object we defined a calcage method.

// -> A prototype object actually has reference back to constructor property. eg Person.prototype.constructor is gonna point back to Person constructor itself.

// -> Person.prototype is not the property of person but of all the objects that are created through the Person constructor function.

//

// How an object is created using the new operator and the constructor function.

// 1. So, when we call a function, any function with the new operator the first thing that is gonna happen is that a new empty object is created instantly.

// 2. This keyword in function constructor call is gonna set to the new object.

// 3. The new object is linked to The constructor function prototype property which is in this case Person.prototype happens internally by Adding __proto__ property to the newly Created object. So Person.prototype is the new object prototype which is noted in __proto__ property of jonas.

// 4. New object is returned from Function.

// Why does it works this way and why its a powerful technique?

// 1. jonas object tries to use jonas.calcage() function, but it cannot be found in his object so it will gonna look up to its prototype property, and it found and gonnna use/utilize that function.

// 2. It looked up using the __proto__ property as we know it points to it prototype. This process is called prototype inheritance/deligation.

// 3. Jonas object inherited the calcAge function from its prototype. We can create as many person object as we like and they all gonna point to the same/one prototype object.

// 4. Jonas is connected to a prototype and the ability of looking up methods and properties in a prototype is what we call the prototype chain.

// The prototype chain

// 1. It doesnt end on person.prototype object, as we know the Person.prototype is itself an object so its prototype is called Object.prototype. whys that?

// 2. Person.prototype is just an simple object, which is built by Object constructor function. This function called behind the scenes whenever we create object literals.

// 3. Person.prototype itself needs to have its prototype, and since it has been created by object constructor function, its prototype will be Object.prototype.

// 4. Same logic with jonas object, as jonas has been built by Person constructor function so  Person.prototype will be the object of jonas.

console.log(jonas.__proto__);

// Object.prototype (top of the prototype chain)
console.log(jonas.__proto__.__proto__);
console.dir(Person.prototype.constructor);

// Prototype property of the constructor is gonna be the prototype of all The objects created by that constructor.
const arr = [1, 2, 4]; // Whenever we create array like this, it is gonna indeed be created by array constructor i.e new Array === []

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// ES6 Classes

// -> Classes are special type of functions. We have class expression and class declerations.
// -> Class really just hides the true nature of prototypal inheritance in javascript.
// -> Classes are not hoisted, function declerations are hoisted.
// -> Classes are also first class citizens.
// -> The body of class is always executed in a strict mode.

// Class Expressions
// const per = class {}

// Class Declerations
class PersonClass {
  // works same, method of the class, called when creating a new operator
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // these functions/methods will be on prototype property of PersonClass, not on object themselves
  // The prototype property of class will be the prototype of all objects created from class.

  // Instance methods.
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // Data validation. set A property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else console.log("not a full name"); //alert("given name is not a full name")
  }

  get fullName() {
    return this._fullName;
  }

  // static method.
  static hey() {
    console.log(this);
    console.log("hey there");
  }
}

const jessica = new PersonClass("Jessica", 1996);
console.log(jessica);
jessica.calcAge(); // 41
console.log(jessica.age); // 41

console.log(PersonClass === jessica.__proto__);

// Setters and Getters

// 1. Common to all object in javascript. Every object can have them, they are also called Assesor properties.
// 2. Normal properties are called data properties. They are functions that they get and set a value.

const acc = {
  owner: "ABC",
  movements: [1, 2, 4, 5],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

// write as if was property. can be useful when We want to read something as property, but still need to do some calculations.
console.log(acc.latest); // 5

acc.latest = 50;

// Static methods

// Array.from() method is a static method used to convert array like structure into orignal array.
// It is attached on the array constructor itself, and not on the prototype property of array constructor. Reason being so that developers know it is related to Arrays.
// We also say that this method is in the array name space.
// Static methods are not available on the instances. It can be useful to create some form of helper function for the class or about the constructor function.

// static method of Person constructor.
Person.hey = function () {
  console.log("hey there");
  console.log(this); // It points to the constructor function. Because Person object is calling the method. It points to the object calling the method.
};

Person.hey();
PersonClass.hey(); // this keyword of hey function will point to the entire class.

// Object.create
// has the idea of prototypal inheritance
// there is no prototype properties involved automatically, also no constructor functions and no new keyword.
// we can use Object.create() to manually set the prototype of object to any other object we want.

// creating object that we want to be the prototype of all The other objects.
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // manual way of initializing the object.
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Creating a person object with "PersonProto" object as a prototype.
const steven = Object.create(PersonProto); // will return A brand new object that is linked to the "PersonProto" prototype that we passed in there.
console.log(steven.__proto__);
steven.name = "steven";
steven.birthYear = 2002;
steven.calcAge(); // 35

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("sarah", 1979);
sarah.calcAge();

// Inheritance between Classes : constructor

const prsn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

prsn.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  prsn.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(prsn.prototype);

Student.prototype.introduce = function () {
  console.log("My name is " + this.firstName + " and i study " + this.course);
};
const mike = new Student("mike", 2001, "c++");
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
// fn Person has firstName, lastName
// this {}

// Person.call(this, firstName, lastName)

// Inheritance between classes

class StudentClass extends PersonClass {
  constructor(fullname, birthYear, course) {
    // Always need to have first
    super(fullname, birthYear);
    this.course = course;
  }

  introduce() {
    console.log("My name is " + this.fullName + " and i study " + this.course);
  }
}

const martha = new StudentClass("Martha Jones", 2012, "C++");
martha.introduce();
martha.calcAge();

// Inheritance between classes "Object.create"

const studentProto = Object.create(PersonProto);
studentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

studentProto.introduce = function () {
  console.log("My name is " + this.fullName + " and i study " + this.course);
};

const jays = Object.create(studentProto);
jays.init("jay", 2010, "C++");
jays.introduce();
jays.calcAge();

// Another Class example
// -> In traditional oop languages, the properties are called fields.
// Public fields, Private fields, Public methods, Private Methods (there is also a static version)

class Account {
  // Public instance fields
  locale = navigator.language;

  // private fields (properties are not accessible outside class)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Private interface (to hide implementation details from outside the class)
  #approveLoan(val) {
    return true;
  }

  // private static methods
  static #helper() {
    console.log();
  }

  // public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc1 = new Account("Pratik", "RUP", 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.approveLoan(1000);

console.log(acc1);
console.log(acc1.pin);

// Error, cannot access private methods outside the class
// console.log(acc1.#movements);
// console.log(acc1.#pin);

const demoFn = function (a, b) {
  // object instances
  this.a = a;
  this.b = b;
};

demoFn.prototype._firstName = "raghav";

const demo1 = new demoFn(10, 20);

const demo2 = new demoFn(10, 20);

console.log(demo1.firstName, demo2);
