///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const countriesContainer = document.querySelector(".countries");

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

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=9ac42e8b26ec44539ed287961b351b7e`
  )
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

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Coding Challenge 2
const imgContainer = document.querySelector(".images");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement("img");
    newImg.src = imgPath;
    newImg.addEventListener("load", function () {
      imgContainer.append(newImg);
      resolve(newImg);
    });

    newImg.addEventListener("error", (err) => {
      reject(new Error("Cannot able to load image"));
    });
  });
};

let currentImg;

// createImage("/img/img-1.jpg")
//   .then((res) => {
//     currentImg = res;
//     console.log("image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     console.log("image 1 hided");
//     return createImage("/img/img-2.jpg");
//   })
//   .then((res) => {
//     currentImg = res;
//     console.log("image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     console.log("image 2 hided");
//   })
//   .catch((err) => console.log(err));

// Coding Challenge 3

const loadNPause = async function () {
  try {
    const img1 = await createImage("/img/img-1.jpg");
    console.log("image 1 loaded");
    await wait(2);
    img1.style.display = "none";
    console.log("image 1 hided");

    const img2 = await createImage("/img/img-2.jpg");
    console.log("image 2 loaded");
    await wait(2);
    img2.style.display = "none";
    console.log("image 2 hided");
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();
// Async function always return a promise and not really the value we are interested in.
// we want to return a fulfilled value of the promise that the async function returns.

const loadAll = async function (imgArr) {
  // const res2 = imgArr.map(async function (d) {
  //   let x = await createImage(d);
  //   return x;
  // });
  // console.log(res2);
  const res = await Promise.all(imgArr.map((d) => createImage(d)));
  res.forEach((img) => img.classList.add("parallel"));
};

loadAll(["/img/img-1.jpg", "/img/img-2.jpg", "/img/img-3.jpg"]);
