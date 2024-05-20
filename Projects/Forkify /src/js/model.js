import { API_KEY, API_URL } from './config';

import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

// responsible for fetching the recipe data from our forkify api.
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

    console.log(data);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // Temp Error handling
    console.error(err);
  }
};
