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

  labelSumInterest.textContent = `${interest}€`;
}

const displayMovements = (movements) => {
  containerMovements.innerHTML = ""
  let html;
    movements.forEach(function(movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
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
  displayMovements(acc.movements);
}

// Event Handelers
let currentAccount = null;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value)
  currentAccount = accounts.find((user) => user.userName === username && user.pin == pin)
  if(currentAccount){
    // clearing fields
    inputLoginPin.value = inputLoginUsername.value = ""

    // Display UI and welcome message
    labelWelcome.textContent = "Welcome Back, "+currentAccount.owner.split(" ")[0]
    containerApp.style.opacity = 100;

    updateUI(currentAccount);
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
  }
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
