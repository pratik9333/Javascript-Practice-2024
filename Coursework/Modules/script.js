// Lec - 2

// An overview of modules

// -> It is an reusable piece of code that encapsulates implementation details of a certain part of our project.

// -> Usually a standalone file, not always a case.

// -> Contains imports and exports, and exports as the name says, it exports values out of module. can be simple values or even entire function. Whatever we export from the module, its called the public api.

// -> This public api is actually consumed by importing values into a module.

// -> We can even import values from other module.

// How es6 modules are imported ?

// -> Here we are importing rand from "math.js" module and "showDice" from "dom.js" module.
// -> When a piece of code is executed, the first step is to parse that code (means to read the code without executing it) and this is the moment where imports are hoisted.
// -> The whole process of importing modules happens before the code in the main modules is actually executed.
// -> So in this example, the index.js module imports the dom and math module in a synchronous way, means only if the imported modules are downloaded and executed, the index.js module will finally be executed as well.

// Why do we actually want modules to be load in a synchronous way ?

// -> It makes bundling and dead code elimination easier.

// -> It is very important in large projects, with 100"s of modules and that include third party modules, from which we only want a small piece and not the entire module.

// -> By knowing all the dependencies between modules before execution, bundlers like webpack and parcel can then join multiple modules together and then eliminate that code. This is the reason why we can only import and export outside of any code that needs to be exexuted.

// Lec-3 First scenerio (Import a module but without importing any value)

// Importing Module
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

// addToCart("bread", 5);
// console.log(price, tq);

console.log("Importing Module");

// we can also import all the exports of the module at the same time. "shoppingCart" will contain object containing everything from that is exported from A module that we will specify here.

// import * as shoppingCart from "./shoppingCart.js";
// never mix default and named exports.

// shoppingCart.addToCart("bread", 5);
// console.log(shoppingCart.totalPrice);

// Imports Are infact a live connection to exports.
// imports are not copies of the exports, they are instead like a live connection, they point to the same place in the memory.

import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 3);

// Lec-4 Top-level await

// In modules, we can now declare await keyword outside of the async functions.
// It Can block the execution of the entire module now.
// If one module imports a module which has a top level await, then the importing module will wait for the one "importing module" to finish the blocking code.

// console.log("Start fetching");

// const res = await fetch("https://jsonplaceholder.typicode.com/todos");

// const data = await res.json();
// console.log(data);

// console.log("something");

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  return { title: data.at(-1).title, id: data.at(-1).userId };
};

const lastPost = getLastPost(); // the async function will Always return a promise, will not return A actual data itself, because by the time we are running this code here, the data has not yet arrived, so we still have that pending promise.

// not very clean
//lastPost.then((res) => console.log(res));

// top level await (recommended)
//const lastPost2 = await getLastPost();

// Lec-4 Module Pattern

// The main goal of module pattern is to encapsulate functionality to have private data And to Expose a public api, the best way of achieving all of that is by simply using a function, because function gives us private data by default and allow us to return values which can become our public api.

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(quantity + " " + product + " was added to cart");
  };

  const orderStock = function (product, quantity) {
    console.log(quantity + " " + product + " ordered from supplier");
  };

  // not storing anywhere. FIX - simply assign result of running this iife here to a new variable.
  return { addToCart, cart, totalPrice, totalQuantity };
})();

shoppingCart2.addToCart("apple", 4);
shoppingCart2.addToCart("pizza", 2);
console.log(shoppingCart2);

// Lec-5 Commonjs Modules

// Besides native ES module and the module pattern, there are also other module patterns that have been used by the javascript in past, not native javascript, they rely on some another external implementations. Two examples Are AMD module and commonjs modules.

// commonJS module - they have been used in The nodejs for almost all of its existence so only very recently es6 modules have been implemented in node.js

// all the modules in the npm repository still use the commonjs module system.

// like es6 modules, in commonjs, on file is one module.
// eg

// Export
// would work in nodejs
// export keyword is object
// export.helloWorld = function () {
//   console.log("Hey");
// };

// Import
// const { helloWorld } = require("./shoppingCart.js");

// Lec-5 NPM - node package manager - its a both a software on a computer and a package repository

// Package.json - stores the entire configuration for our project.

// import cloneDeep from "lodash-es"; // parcel will automatically find the path to this module and will simply import it without us to having manually type the entire path to module

import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 2 },
    { product: "pizza", quantity: 2 },
  ],
  user: { loggedIn: true },
};

console.log(cloneDeep);

//const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

console.log(state);
console.log(stateDeepClone.__wrapped__);

// Lec-6 Building with parcel and npm scripts

// A dev dependencies is basically like a tool that we need to build our applications but its not a dependency that we include in our code.

// parcel is just another cli.
// In parcel, we can activate hot module replacement. Means whenever we change module. it will trigger a rebuild but that new modified bundle will automatically get injected into the browser without triggering a whole page reload and it will be useful to maintain state on a page.

// Whenever we are done developing project, it is time to build the final bundle. so the bundle that is compressed and has that code elimination and all of that. There is another parcel command which is parcel build index.html

if (module.hot) {
  module.hot.accept();
}

// Lec - 7 Configuring babel and polyfilling

// What is presets?

// -> Basically a bunch of plugins bundeled together. And by default, parcel is going to use babel/@preset-env and it will automatically select which javascript features should be compiled based on browser support.

// Not a part of preset - it only includes final features that are already part of a language after passing the four stages of ecma process.

// transpiling class fields as they are still on stage 3

// class Person {
//   greeting = "hey";
//   constructor() {
//     this.name = name;
//     console.log(`${this.greeting}, ${this.name}`);
//   }
// }

// const jonas = new Person("jonas");

import "core-js/stable";
