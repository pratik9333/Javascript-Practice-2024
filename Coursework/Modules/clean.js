"use-strict";

// Object.freeze only freezes the first level of object. its not a deep freeze
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

// A function that has or that produces side effects is called a impure function

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure Function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

const checkExpenses = function (state, limits) {
  return state.map((entry) => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "Limit" }
      : entry;
  });

  // for (const entry of budget)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = "limit";
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description(-2))
    .join(" / ");

  // let output = "";
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? entry.description.slice(-2) + " /" : "";
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);

// Focus on some of declarartive and function principles

// 1. Immutability
// 2. Side effects and pure functions
// 3. Making data transformations using pure functions such as app, filter and reduce.

// old code

// if (entry.value <= -bigLimit) {
//   output += entry.description.slice(-2) + " / "; // Emojis are 2 chars
// }

// var lim;
// if (limits[el.user]) {
//   lim = limits[el.user];
// } else {
//   lim = 0;
// }

// var lim;

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;

//   if (limits[user]) {
//     lim = limits[user];
//   } else {
//     lim = 0;
//   }
