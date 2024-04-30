"use-strict";

// What is asynchronous javascript?

// -> Asynchronous code is executed after a task that runs in background finishes.

// -> Asynchronous code is non blocking.

// -> Execution doesnt wait for the asynchronous task to finish its work.

// -> In the meantime when the asynchronous code running in the background, in out case is this callback function which has specific timer included to execute after specified time,so in the meantime the rest of the code will keep running normally.

// -> When the timer finishes after 5 second, the callback function will executed as well. it runs after all the other code even tho it doesnt appear in The end.

// -> It literally means not occuring at the same time.

// what is synchronous javascript?

// -> it means the code is executed line by line in the exact order of execution that we define in out code.

// -> As the first line of code is reached in the execution, it is simply executed in the execution thread(part of the execution context which actually executes the code in computers cpu) all in the sequence.

// -> Each line of code waits for the previous line to finish execution. It can create problems when one line of code takes long time to run.

// LEC 1
const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

const renderCountry = function (data, neighbour = "") {
  let language, currency;

  for (const [, value] of Object.entries(data.languages)) {
    language = value;
  }

  for (const [, value] of Object.entries(data.currencies)) {
    currency = value.name;
  }

  const html = `<article class="country ${neighbour}">
<img class="country__img" src=${data.flags.png} />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span> ${(
    +data.population / 1000000
  ).toFixed(1)}</p>
  <p class="country__row"><span>🗣️</span>${language}</p>
  <p class="country__row"><span>💰</span>${currency}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

//////////////////////////////////////////

const getCountryAndNeighbour = function (country) {
  // There are multiple ways of doing ajax calls, lets start with old school one.
  // CORS - cross origin resource sharing should set to yes or unknown or we will not be able to Access third party api from out code.

  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`); // Type of http request to get data is simply called GET

  // const data = request.send(); cannot do this because simply the result is not there yet because the ajax call is being done in background while Rest of the code is running, this is the asynchronous non blocking behavior that We talked about in the last lecture.

  request.send(); // fetches the data in background and emits the load event.

  // rather we can register a callback on the request object on the load event.
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    // Render Country 1
    //renderCountry(data);

    // Get Neighbour Country (2)
    const neighbour = data.borders?.[0];

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);

      // Render Country 2
      //renderCountry(data, "neighbour");
    });
  });
};

getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa");
// getCountryAndNeighbour("germany");

// Lec 4 - Callback Hell (ABOVE) -> Basically means when have a lot of nested callbacks in order to execute asynchronous tasks in sequence. Happens with all asynchronous callbacks.

// Lec - 5
// Modern way of making ajax calls is by using fetch API.

// const request = fetch(`https://restcountries.com/v3.1/name/portgual`);

// The promise lifecycle (can be in different states)

// -> Since promises works with the asynchronous operations, they are time sensitive, they change over time.

// -> In the very beginning, the promise is pending, this is before any value from the asynchronous tasks is available. During this time, the async tasks is still doing work in background.

// -> When the task finally finishes, we say that the promise is settled. There are two types of settled promises, the fulfilled and rejected promises.

// -> Promise is only settled once.

// -> These different states are relevant and useful when we use the promise to get the result which is called to consume the promise.

// -> We consume the promise when we already have the promise. eg returned from fetch function.

// -> Fetch api builds the promise and returns it for us to consume it.

// LEC - 6 && Lec- 7 && lec-8 && lec - 9

// Instead of callback hell, we have flat chain of promises.
// A promise in which the error happened, is an rejected promise.
// fetch promise only rejects the promise when there is no internet connection.

const getJSON = function (url, errorMessage = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

/* const getCountryData = function (country) {
  // returns promise and its still pending. cuz async task is still running in the background.
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // then method always returns the promise and then we can handle the fulfill value of promise in next "then method". if return value, the value will become the fulfillment value of the promise.
    .then(
      (response) => {
        // throwing errors manually
        if (!response.ok)
          throw new Error("Country not found " + response.status); // creating new error by this constructor function
        // Note - throw keyword will immediately terminate current function and promise will immedately rejects.
        response.json();
      } // to Read the data from response, we call JSON method is available on all the response object / result value coming from fetch function. returns promise and its async function
    )
    .then((data) => {
      renderCountry(data[0]);
      //const neighbour = data[0]?.borders[0];

      const neighbour = "dkdk";

      if (!neighbour) throw new Error("No Neighbour Found");

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Country not found " + response.status);

      response.json();
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => alert(err.message)) // will catch any errors that happened anywhere in the chain of "then" methods. handling promise rejections no matter where it happens in the chain.
    .finally(() => {});
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "No Country Found"
  ).then((data) => {
    renderCountry(data[0]);
    const neighbour = data[0]?.borders[0];

    if (!neighbour) throw new Error("No Neighbour Found");

    // Country 2
    return getJSON(
      `https://restcountries.com/v3.1/alpha/${neighbour}`,
      "Country Not Found"
    )
      .then((data) => renderCountry(data[0]))
      .catch((err) => alert(err.message))
      .finally(() => {});
  });
};

getCountryData("india");

*/

// Lec - 11 - Event loop in practice

console.log("test start");

setTimeout(() => console.log("0 sec timer"), 0);
Promise.resolve("resolved promise 1").then((res) => console.log(res));

Promise.resolve("Resolved promise 2").then((res) => {
  setTimeout(() => console.log("10 sec timer"), 10);
  console.log(res);
});

console.log("test end");

// Lec - 12 - Building simple promise

// creating a new promise by using Promise constructor, its A special kind of object
// takes one argument, and it called as the executor function
// the Executor function will contain the asynchronous behavior that we are trying to handle with promise, it should eventually produce a resolved value, basically a future value of promise.
// as soon As the constructor function runs, it will execute the exector function that we pass in with two agruments passed into that function.
const lotteryPromise = new Promise(function (resolve, reject) {
  // if true, we win the lottery, therefore a fulfilled promise
  // to set the promise as fulfilled, we use resolve() function
  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("you WIN !!");
    } else {
      reject(new Error("you lost :(("));
    }
  }, 2000);
});

// consuming promise

// promise object
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log("I waited for 2 sec");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 sec"));

// Lec 13 - Promisying geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=9ac42e8b26ec44539ed287961b351b7e`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Cannot able to fetch country details, please try again, (${response.status})`
        );
      return response.json();
    })
    .then((data) => {
      const city = data.features[0].properties.city;
      const country = data.features[0].properties.country;
      console.log(`you are in ${city}, ${country}`);

      // getting country data
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Cannot able to fetch country data, please try again, (${response.status})`
        );
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

btn.addEventListener("click", whereAmI);

// Lec 14 - Consuming promises with async/await && lec - 15 handling error with try/catch

// The async await are simply the syntatic sugar over then method in promises.
// Its just a different way of consuming promises.
// Async function always returns the promise.

const whereAmI2 = async function () {
  try {
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // reverse Geocoding
    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=9ac42e8b26ec44539ed287961b351b7e`
    );

    if (!resGeo.ok) {
      throw new Error("Problem getting location data");
    }

    const dataGeo = await resGeo.json();

    // Country Data
    const country = dataGeo.features[0].properties.country;

    // fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=9ac42e8b26ec44539ed287961b351b7e`).then((res) => console.log(res));

    // Its Same as above commented code.
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Problem getting country data");
    }

    renderCountry(data[0]);

    return `you are in A ${country}`;
  } catch (err) {
    console.log(err);
    console.log(err.message);

    // Reject promise returned from async function
    throw err;
  }
};

console.log("1: will get location");
// const city = whereAmI2();

// Lec - 17 - returning values from async function
// whereAmI2()
//   .then((country) => console.log(`2: ${country}`))
//   .catch((err) => console.log(`2: ${err.message}`))
//   .finally(() => {
//     console.log("3: Finished getting location");
//   });

// converting to async await
(async function () {
  try {
    const country = await whereAmI2();
    console.log(`2: ${country}`);
  } catch (error) {
    console.log(`2: ${err.message}`);
  } finally {
    console.log("3: Finished getting location");
  }
})();

// Lec - 18 - Running promises in parallel

const getThreeCountries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.log(err.message);
  }
};

getThreeCountries("portugal", "canada", "tanzania");

// lec 19 - Other Promise Combinators

// Promise.race() - receives an array of promises and returns a promise. This promise returned by Promise.race() is settled as soon as one of the input promise is settled. A settled simply means the value is available, doesnt matter if the promise got rejected or fulfilled. In promise.race() the first settled promise wins the race. This returned promise settles with the eventual state of the first promise that settles.

// In other words, it fulfills if the first promise to settle is fulfilled, and rejects if the first promise to settle is rejected.

// The Promise.race() method is one of the promise concurrency methods. It's useful when you want the first async task to complete, but do not care about its eventual state (i.e. it can either succeed or fail).

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);

  console.log(res);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(0.5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err));

// Promise.allSettled - takes in the array of promises, it will simply return an array of all the settled promises, no matter if the promises got rejected or not.
