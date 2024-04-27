'use strict';

// Architecture - > how we gonna implement it (contains low level details)
// Flowchart - > what we gonna implement it (contains high level overview)

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  // click() {
  //   this.clicks++;
  // }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

////////////////////////////////////
// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  #editOption = { status: false, targetID: null };
  #markers = [];

  constructor() {
    // get users position
    this._getPosition();

    // get data from local storage
    this._getLSData();

    // attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  // this points to the object calling method.

  // under prototype chain.
  _getPosition() {
    // Geolocation api is a browser API
    // getting users current position by using geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this._loadMap(position);
        },
        () => alert('Could not get your position')
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // load a map and and center that map on these above positions
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // L -> main function/namespace by leaflet library to use couple of methods and available globally
    // any variable that is global in any script will be available to other scripts
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    const elevationFormRow = inputElevation.closest('.form__row');
    const cadenceFormRow = inputCadence.closest('.form__row');
    if (inputType.value === 'cycling') {
      cadenceFormRow.classList.add('form__row--hidden');
      elevationFormRow.classList.remove('form__row--hidden');
    }
    if (inputType.value === 'running') {
      elevationFormRow.classList.add('form__row--hidden');
      cadenceFormRow.classList.remove('form__row--hidden');
    }
  }

  // helper functions
  static validInputs(...inputs) {
    return inputs.every(input => Number.isFinite(input));
  }

  static allPositive(...inputs) {
    return inputs.every(inp => inp > 0);
  }

  _hideForm() {
    // Clear input fields
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'));
  }

  modifyWorkoutListArray(type) {
    const id = this.#editOption.targetID;

    const modifiedArray = this.#workouts.reduce((acc, obj) => {
      if (obj.id === id) {
        // Clone the object and modify the property
        const modifiedObj =
          type === 'running'
            ? {
                ...obj,
                distance: +inputDistance.value,
                duration: +inputDuration.value,
                cadence: +inputCadence.value,
                pace: +inputDuration.value / +inputDistance.value,
              }
            : {
                ...obj,
                distance: +inputDistance.value,
                duration: +inputDuration.value,
                elevationGain: +inputElevation.value,
                speed: +inputDistance.value / (+inputDuration.value / 60),
              };
        acc.push(modifiedObj);
      } else {
        // No modification needed, push the original object
        acc.push(obj);
      }
      return acc;
    }, []);

    return modifiedArray;
  }

  _reRenderWorkoutListOnUI(type) {
    this.#workouts = this.modifyWorkoutListArray(type);
    this._hideForm();

    // removing old workout list ele from UI
    while (form.parentElement.children.length > 1) {
      form.parentElement.removeChild(form.parentElement.lastElementChild);
    }

    // updating new workout list on UI
    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });

    this.#editOption.status = false;
    this.#editOption.targetID = null;
    inputType.disabled = false;

    // updating workouts in local storage
    this._setLSData();
  }

  _newWorkout(e) {
    e.preventDefault();

    // get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;

    // if workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid
      if (
        !App.validInputs(distance, duration, cadence) ||
        !App.allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be positive numbers');
      }

      // updating workout list from workouts array and re-rendering on UI
      if (this.#editOption.status) {
        this._reRenderWorkoutListOnUI(type);
        return;
      }

      // else creating new workout object and rendering on UI
      workout = new Running(
        [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng],
        distance,
        duration,
        cadence
      );
    }

    // if workout cycling, create cycling object
    if (type === 'cycling') {
      const elevGain = +inputElevation.value;
      // check if data is valid
      if (!App.validInputs(distance, duration, elevGain)) {
        return alert('Inputs have to be positive numbers');
      }

      // updating workout list from workouts array and re-rendering on UI
      if (this.#editOption.status) {
        this._reRenderWorkoutListOnUI(type);
        return;
      }

      // else creating new workout object and rendering on UI
      workout = new Cycling(
        [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng],
        distance,
        duration,
        elevGain
      );
    }

    // add new object to the workout array
    this.#workouts.push(workout);

    // render workout on map as marker
    this._renderWorkoutMarker(workout);

    // render workout on the list
    this._renderWorkout(workout);

    // set data to local storage
    this._setLSData(workout);

    // hide the form
    this._hideForm();
  }

  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${
        workout.type === 'running'
          ? workout.pace.toFixed(1)
          : workout.speed.toFixed(1)
      }</span>
      <span class="workout__unit">${
        workout.type === 'running' ? 'min/km' : 'km/h'
      }</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        workout.type === 'running' ? workout.cadence : workout.elevationGain
      }</span>
      <span class="workout__unit">${
        workout.type === 'running' ? 'spm' : 'm'
      }</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon"><i class="fa-regular fa-pen-to-square edit"></i>
      </span>
    </div>
    <div class="workout__details">
      <span class="workout__icon"><i class="fa-solid fa-trash delete"></i>
      </span>
    </div>
  </li>
    `;

    /* 
    <!-- beforebegin -->
      <p>
        <!-- afterbegin -->
          foo
        <!-- beforeend -->
      </p>
    <!-- afterend -->
    */
    form.insertAdjacentHTML('afterend', html);
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords);
    marker
      .addTo(this.#map)
      .bindPopup(
        // bindPopup creates popup and binds to marker
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: workout.type + '-popup',
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    this.#markers.push(marker);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );

    if (e.target.classList.contains('delete')) {
      this._deleteWorkout(workout);
      return;
    }

    if (e.target.classList.contains('edit')) {
      this._editWorkout(workoutEl);
      return;
    }

    //TODO:checking documentation
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // using public interface
    // workout.click();
  }

  // LS - LocalStorage
  _setLSData() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLSData() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _deleteWorkout(workout) {
    const targetID = workout.id;

    const updatedWorkout = this.#workouts.filter(
      workout => workout.id !== targetID
    );

    this.#workouts = updatedWorkout;

    for (const element of form.parentElement.children) {
      if (element.dataset.id === targetID) {
        element.remove();
      }
    }

    this.#markers.forEach(layer => {
      if (
        layer._latlng.lat == workout.coords[0] &&
        layer._latlng.lng == workout.coords[1]
      ) {
        this.#map.removeLayer(layer);
      }
    });

    this._setLSData();
  }

  _editWorkout(workoutEl) {
    // toggling form visibility to true
    form.classList.remove('hidden');

    this.#editOption.status = true;
    this.#editOption.targetID = workoutEl.attributes['data-id'].value;

    // extracting values from selected workout element and setting it back to form input fields
    this._extractElValues(workoutEl);
  }

  _extractElValues(workoutEl) {
    const details = workoutEl.querySelectorAll('.workout__details');

    inputDistance.value =
      details[0].querySelector('.workout__value').textContent;
    inputDuration.value =
      details[1].querySelector('.workout__value').textContent;

    if (workoutEl.classList.contains('workout--running')) {
      inputType.value = 'running';
      inputCadence.value =
        details[3].querySelector('.workout__value').textContent;
    }

    if (workoutEl.classList.contains('workout--cycling')) {
      inputType.value = 'cycling';
      inputElevation.value =
        details[3].querySelector('.workout__value').textContent;
    }
    this._toggleElevationField();
    inputType.disabled = true;
  }
}

const app = new App();

// class object instances + prototype property/methods of class.

/* old code 
  // if(inputType.value === "cycling"){
  //     cadenceFormRow.classList.add("form__row--hidden");
  //     elevationFormRow.classList.remove("form__row--hidden")
  // }
  // if(inputType.value === "running"){
  //     elevationFormRow.classList.add("form__row--hidden");
  //     cadenceFormRow.classList.remove("form__row--hidden");
  // }

  // !Number.isFinite(distance) ||
      // !Number.isFinite(duration) ||
      // !Number.isFinite(cadOrElev)
  
  //   if (workout.type === 'running') {
    //     html += `<div class="workout__details">
    //     <span class="workout__icon">⚡️</span>
    //     <span class="workout__value">${workout.pace.toFixed(1)}</span>
    //     <span class="workout__unit">min/km</span>
    //   </div>
    //   <div class="workout__details">
    //     <span class="workout__icon">🦶🏼</span>
    //     <span class="workout__value">${workout.cadence}</span>
    //     <span class="workout__unit">spm</span>
    //   </div>
    // </li>`;
    //   }

    //   if (workout.type === 'cycling') {
    //     html += `<div class="workout__details">
    //     <span class="workout__icon">⚡️</span>
    //     <span class="workout__value">${workout.speed}</span>
    //     <span class="workout__unit">km/h</span>
    //   </div>
    //   <div class="workout__details">
    //     <span class="workout__icon">⛰</span>
    //     <span class="workout__value">${workout.elevationGain}</span>
    //     <span class="workout__unit">m</span>
    //   </div>
    // </li>`;
    //   }
*/
