const { client } = require('../../config/redis.config');

async function SearchCache(apiKey) {
  try {
    let resource = await client.get(apiKey);
    if (resource) {
      resource = JSON.parse(resource);
    }
    return resource;
  } catch (error) {
    console.error(error);
  }
}

async function setCache(apiKey, payload) {
  try {
    return client.set(apiKey, JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
}

async function removeKey(apiKey) {
  try {
    return client.del(apiKey);
  } catch (error) {
    console.error;
  }
}

module.exports = {
  SearchCache,
  setCache,
  removeKey,
};
