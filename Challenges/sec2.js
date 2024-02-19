
// challenge - 1

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const scoreDolphins = calcAverage(44, 23, 71);

const scoreKoalas = calcAverage(65, 54, 49);

const checkWinner = (avgDolphins, avgKoalas) => {

    if (avgKoalas >= 2 * avgDolphins) {
        return `koalas win (${avgKoalas} vs ${avgDolphins})`
    }
    else if (avgDolphins >= 2 * avgKoalas) {
        return `Dolphins win (${avgDolphins} vs ${avgKoalas})`
    }
    else {
        return `No team wins...`
    }
}

console.log(checkWinner(scoreDolphins, scoreKoalas));

// challenge in a video *arrays*

const jonas = {
    firstName: "jonas",
    lastName: "schmedtmann",
    birthyear: 1997,
    job: "teacher",
    friends: ['Michael', 'peter', "steven"],
    calcAge: function () {
        this.age = 2037 - this.birthyear;
        return this.age;
    },
    hasDriverLicense: false,
    checkDriverLicense: function () {
        if (this.hasDriverLicense) return true;
        else return false;
    }
    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

}

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);


console.log(jonas.calcAge());

console.log(jonas.age);

console.log(`${jonas.firstName} is a ${jonas.age} year old teacher, and he has ${jonas.checkDriverLicense() ? 'a driver license' : 'no driver license'}`);

// a function attached to object is Called method 

// this keyword: it is equal to the objecton which the method is called.. equal to object calling method. 

// arrays are also objects. they are just special kind of objects. they have functions / methods that we can use to manipulate them. like push, pop, shift and unshift And many more. 

// if-else statement. they are control structures. also Are the loops. 

// challenge 2

const mark = {
    fullName: "Mark Millers's",
    mass: 49,
    height: 1.68,
    calcBMI: function () {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI
    }
}

const john = {
    fullName: "John Smith's",
    mass: 50,
    height: 1.22,
    calcBMI: function () {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI
    }
}
john.calcBMI();
mark.calcBMI();

console.log(`${mark.BMI > john.BMI ? mark.fullName + ` BMI (${mark.BMI}) is greater than ${john.fullName} (${john.BMI}) BMI` : john.fullName + ` BMI (${john.BMI}) is greater than ${mark.fullName} (${mark.BMI}) BMI`}`);