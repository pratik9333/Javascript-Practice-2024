// challenge 1

let massMark = 78, heightMark = 1.69, massJohn = 92, heightJohn = 1.95;

const MarkBMI = massMark / (heightMark * heightMark);

const JohnBMI = massJohn / (heightJohn * heightJohn);

const markHigherBMI = MarkBMI > JohnBMI;


if (MarkBMI > JohnBMI) {
    console.log(`Mark's BMI (${MarkBMI}) is higher than John's (${JohnBMI})`);
}
else {
    console.log(`John's BMI (${MarkBMI}) is higher than Mark's (${JohnBMI})`);
}

// 5 falsy values : 0, "", undefined, null, NAN

// challenge 2

const dolScore1 = 96, dolScore2 = 108, dolScore3 = 89, KoalScore1 = 88, KoalScore2 = 91, KoalScore3 = 110;

const avgScoreDolphinTeam = (dolScore1 + dolScore2 + dolScore3) / 3;

const avgScoreKoalasTeam = (KoalScore3 + KoalScore2 + KoalScore1) / 3;

if (avgScoreKoalasTeam > avgScoreDolphinTeam && avgScoreKoalasTeam >= 100) {
    console.log("Koalas win the trophy");
}
else if (avgScoreDolphinTeam > avgScoreKoalasTeam && avgScoreDolphinTeam >= 100) {
    console.log("Dolphins win the trophy");
}
else if (avgScoreDolphinTeam === avgScoreKoalasTeam && avgScoreDolphinTeam >= 100 && avgScoreKoalasTeam >= 100) {
    console.log("Both Win the trophy");
}
else {
    console.log("No one wins the trophy");
}