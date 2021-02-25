// This helpers.js is the place that we put the  General Function that will be used over the place

/////////////////// IMPORT
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const respond = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await respond.json();
    if (!respond.ok) {
      throw new Error(`${respond.status} ${data.message}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
