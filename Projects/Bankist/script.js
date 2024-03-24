'use strict';

// Notes

// 1. pass the required data into the function rather than creating global variable and function using that data. 

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount = null, timer;

const hidingOrShowingUI  = function (labelText = 'Log in to get started', opacity = 0){
  labelWelcome.textContent = labelText;
  containerApp.style.opacity = opacity;
}


const startLogoutTimer = () => {
  // set time to 5 min
  let seconds = 11;
  let minutes = 0;

  const tick = function() {
    if(seconds === 0) {
      minutes-=1; 
      seconds = 11;
    }
    if(minutes === -1) {
      clearInterval(timer);
      hidingOrShowingUI();
    }
    if(minutes >=0){
      seconds-=1;
      // In each call, print the remaining time to UI
      labelTimer.textContent = `${String(minutes).padStart(2,0)}:${String(seconds).padStart(2,0)}`;
    }
  }

  // call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
}

const calcDisplayBal = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov)
  labelBalance.textContent = acc.balance+"€";
}

const calcDisplaySummary = function(account){
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov,0);
  labelSumIn.textContent = incomes+"€";

  const out = account.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov,0);
  labelSumOut.textContent =  Math.abs(out)+"€";

  const interest = account.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * account.interestRate) / 100)
  .filter((int) => int >= 1)
  .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${Math.trunc(interest)}€`;
}

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = "";

  const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;

  let html;
  movs.forEach(function(movement, index) {
  const displayDate = getCurrentDate();

  const type = movement > 0 ? "deposit" : "withdrawal";
    html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${movement}€</div>
    </div>`
    containerMovements.insertAdjacentHTML("afterbegin", html);
  }); 
}

const createUsernames = function(accs){
  accs.forEach(function (account){
    account.userName = account.owner.toLowerCase().split(" ").map(name => name[0]).join("")
  })
}
createUsernames(accounts)

const updateUI = function(acc) {
  // calculate and display balance
  calcDisplayBal(acc);

  // calculate and display summary
  calcDisplaySummary(acc)

  // Display movements
  displayMovements(acc);
}

const getCurrentDate = function(){
  const date = new Date();

  return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
}

// Event Handelers
labelDate.textContent = getCurrentDate();

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value)
  currentAccount = accounts.find((user) => user.userName === username && user.pin == pin)
  if(currentAccount){
    // clearing fields
    inputLoginPin.value = inputLoginUsername.value = ""

    // Display UI and welcome message
    updateUI(account1);
    if(timer) clearInterval(timer);
    timer = startLogoutTimer();
    hidingOrShowingUI("Welcome Back, "+currentAccount.owner.split(" ")[0], 100)
  }
  else{
    alert("Wrong username or pin, please try again")
    inputLoginPin.value = inputLoginUsername.value = ""
  }
})

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  
  const receipentUsername = inputTransferTo.value
  const amount = Number(inputTransferAmount.value)

  inputTransferTo.value = inputTransferAmount.value = "";

  const receipent = accounts.find((user) => user.userName === receipentUsername)

  if(receipent && amount > 0 && amount <= currentAccount.balance && receipent?.userName !== currentAccount.userName){
    currentAccount.movements.push(-amount);
    receipent.movements.push(amount);
    updateUI(currentAccount);
    
    // Reset Timer 
    clearInterval(timer);
    timer = startLogoutTimer();
  }
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);

    // .indexOf(23)

    // delete account
    accounts.splice(index, 1)

    // Hide UI
    hidingOrShowingUI();
  }

  inputCloseUsername.value = inputClosePin.value = '';
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
  setTimeout(() => {
    updateUI(currentAccount);
    inputLoanAmount.value = ""
  
    // Reset Timer 
    clearInterval(timer);
    timer = startLogoutTimer();
  }, 3000);

}

})


let sorted = false;
btnSort.addEventListener('click',(e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Some and Every method

// EQUALITY
console.log(movements.includes(23));

// SOME: CONDITION: Checking deposits
console.log(movements.some(mov => mov > 0))

// EVERY
console.log(account4.movements.every(mov => mov > 0))

// Flat method

// second method
// const [{movements: one}, {movements: two}, {movements: three}, {movements: four}] = accounts;

// First
// for(const {movements} of accounts){
//   movementss.push(movements)
// }

// flat
const overallBalance = accounts.map((acc) => acc.movements).flat().reduce((acc, mov) => acc + mov);

// flatMap
const overallBalance2 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov);

console.log(overallBalance2);

// Sort

// Dry Run

// return < 0, a, b (Keep Order)
// return > 0, b, a (switch order)
movements.sort((a,b) => {
  if(a > b) return 1;
  if(b > a) return -1;
})
