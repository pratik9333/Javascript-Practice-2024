// OOP with Javascript
// Coding Challenge 1 

/* 
1. Use a construction function to implement a car. A car has a make and speed property. The speed property is the current speed of the car in km/hr. 

2. Implement an "accelerate" method that will increase the car speed by 10, and log the new speed to the console.

3. Implement the "break" method that will decrease the Car speed by 5, and log the new speed to the console. 

4. Create 2 car objects and experiment with calling "accelerate" and "break" multiple times on Each of them.
*/

// Coding starts here

const Car = function(make, speed){
    this.speed = speed;
    this.make = make;
}

Car.prototype.accelerate = function(){
    this.speed +=10;
    //console.log(this.make+" going at "+this.speed+" km/hr");
}

Car.prototype.break = function(){
    this.speed -=5;
    //console.log(this.make+" going at "+this.speed+" km/hr");
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 70);

// bmw.accelerate();
// mercedes.accelerate();
// bmw.break();
// mercedes.break();

// Coding Challenge 2

class Car1 {
    constructor(speed, make){
        this.speed = speed;
        this.make = make;
    }

    accelerate(){
        this.speed +=10;
        //console.log(this.make+" going at "+this.speed+" km/hr");
    }

    break(){
        this.speed -=5;
        //console.log(this.make+" going at "+this.speed+" km/hr");
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

const ford = new Car1("ford", 120);
ford.accelerate();
ford.accelerate();
ford.break();
ford.speedUS = 50;

// coding challenge 3
const EV = function(charge, make, speed){
    Car.call(this, make, speed);
    this.charge = charge;
}

// Linking/inheriting or setting the prototype of EV.prototype to Car prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.accelerate = function(){
    this.speed+= 20;
    this.charge-= 1;
    //console.log(this.make+" going at "+ this.speed+" km/hr"+" with A charge of "+this.charge);
}

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

const evObj = new EV(23, "Tesla", 120);

//console.log(evObj);
evObj.accelerate();
evObj.break();
evObj.chargeBattery(90);
evObj.accelerate();

// Coding challenge 4 

class EVCL extends Car1{
    #charge;

    constructor(speed, make, charge){
        super(speed, make);
        this.#charge = charge;
    }

    accelerate(){
        this.speed += 20;
        this.#charge -= 1;
        console.log(this.make+" going at "+ this.speed+" km/hr"+" with A charge of "+this.#charge+"%");
        return this;
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }

    break(){
        this.speed -= 8;
        return this;
    }
}

const carObj1 = new EVCL(120, "BMW", 40);
carObj1.chargeBattery(80).accelerate();
