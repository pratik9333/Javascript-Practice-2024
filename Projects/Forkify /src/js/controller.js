import 'core-js/stable';

import * as model from './model';
import recipeView from './views/recipeView';

// https://forkify-api.herokuapp.com/v2
// api key - f6e2f5b4-d583-4046-9b0f-85863500ec68

///////////////////////////////////////

// Design patters are basically standard solutions to certain kind of problems.

// Subscriber - Code that wants to React.

export const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // guard clause
    if (!id) return;

    // 1. render spinner
    recipeView.renderSpinner();

    // 2. Loading Recipe
    await model.loadRecipe(id);

    // 3. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes); // passing "controlRecipes" as a handler
};

init();

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// Why worry about architecture when we build a software?

// 1. Structure

// -> The architecture will give our project a structure in which we can than write a code.
// -> Just like a house, software also needs a structure.
// -> In software, a strucure means how we organize and divide the code into different modules, classes and functions, so all these will basically hold our code together and give it structure.

// 2. Maintainability

// -> When we build a project, we always need to think about the future. Keep in mind that project is never really done.
// -> We will always need to change things in the future and we will need to maintain the project, and that only works if we nicely structured the project plus we might even need to add new features to the project.

// 3. Expandability

// -> It means to Easily add new features in the future that is only possible with A good structure and a good architecture.

// So, the perfect architecture is basically one that allows for all these three aspects of structure, maintainability and expandability.

// What are components of architecture ?

// 1. Business logic

// -> Business logic is the logic that is really related to solve the problem that the business sets out to solve in the first place.

// 2. State

// -> One of the most imp aspect of any web app.
// -> The app state is what essentially stores all the data about the application that is running in the browser, so The data about the applications frontend.
// -> The data should be the "single source of truth" which should be kept in sync with the user interface, means if some data changes in the state, then the UI should reflect that, same true vica versa.

// 3. HTTP Library

// -> Responsible for making and receiving AJAX requests.
// -> Optional but almost always necessary in real-world apps.

// 4. Application Logic (Router)

// -> Code which is only concerned about the implementation of application itself, so its more of technical aspects of application which are not directly Related to The underlying business problem, eg handling navigation or UI events.

// 5. Presentation Logic (UI Layer)

// -> Code that is concerned about the visible part of the application.
// -> Essentially the presentation logic is responsible for displaying the application state on the user interface in order to keep everything in sync.

// so, in general, an architecture has a way of seperating all these components, instead of mixing everything together in one big file and one big mess.

// The well establish architecture pattern that We gonna use in this project, that is the model view controller architecture.

// MVC Architecture

// -> So, these architecture contains three big parts, which Are the "model", "view" and "controller".

// -> "view" is afcourse for the "Presentation Logic", it is part of the application interacting with the user.
// -> The "model" is all about the applications data, so it contains the "state" and "business logic" that manipulates the state, so these 2 should be kept closely together.
// -> The "model" also contains "http library", that might get some data from the web, from some api or from some backend, it also about data, so it goes in "model".
// -> "Controller" is what contains the application logic, it kind of sits between the model and view, it basically creates a bridge between "model" and "views" which know nothing about each other.
// -> The "model" and a "view" will exists completely independent from one another, not even knowing the other one exists.
// -> One of the big goals of mvc patterns is to Seperate business logic from application logic, which makes developing the application so much easier, but as a consequence, we then need something to connect these two parts, and so that is the controller.

// A typical flow of actions and of data as soon as some event happens on the user interface, eg click.

// -> To start, its gonna be controller who will handle the event, because handling the event is doing something in the application, clearly part of application logic.

// -> This handling might involve updating UI and also ask the model for some data (Controller dispatches task to the model and view or in other words it controls and orchatrates this entire action and infact the whole application), so asking the data from model might involve some ajax calls to Web, that exactly what a model does.

// -> When the data arrives, the controller takes the data and sends it to view, to finish, the view will render that data to the user interface and finish this cycle.

// note - In A diagram you See two types of arrows, dotted arrow represents data flow between The different parts while the solid arrow represents actual function call and module imports.

// Analyzing this, we can See only the controller who imports and calls function from the model and from the view, never the other way around,

// The model and view are compeltely standalone and completely isolated, they dont import each other and they dont even import controller, and infact they dont even know if the controller exists, all they do is to just basically sit there waiting to get some instruction from the controller.

// -> The mvc architecture applied to the forkify application that We already implemented.

// -> Flowchart(what we will implement) of loading and rendering the recipe - handling these events is associated to the controller, loading the recipe happens in the model, so the controller calls some function that is in the model, and then the model asynchronously gets the recipe data from the api.

// -> Once the data has arrived, the controller asks for that data, receives it, sends it to the view, which will then ultimately render the recipe in the screen.
