import { async } from 'regenerator-runtime';

import { TIMEOUT_SEC } from './config';

// Goal of this file/module is to contain couple of functions that we reuse again And again in our prj.

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    console.log(res);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    return data; // going to be the result value of the promise that the getJSON function returns.
  } catch (err) {
    throw err;
  }
};
