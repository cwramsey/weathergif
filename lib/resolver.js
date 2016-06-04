'use strict';

const fetch = require('node-fetch');
const rand = require('./rand');

function getTerm(weather) {
  weather = weather.toLowerCase();

  if (weather.includes('rain')) {
    return rand(['rain', 'raining', 'raining cats and dogs', 'pouring rain', 'storm', 'storming']);
  }

  if (weather.includes('clear') || weather.includes('sun')) {
    return rand(['sun', 'sunny', 'clear sky', 'blue sky']);
  }

  if (weather.includes('snow')) {
    return rand(['snowing', 'snow', 'arctic', 'polar bear', 'cold', 'frozen', 'icy', 'ice']);
  }

  return weather;
}

function getGifs(term) {
  return fetch(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${process.env.GIPHY_API_KEY}`)
    .then(res => res.json());
}

function mapGifs({images}) {
  return {
    url: images.downsized.url,
    width: images.downsized.width,
    height: images.downsized.height
  };
}

module.exports = (req, res) => {

  let weather = '';

  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${req.query.text},us&APPID=${process.env.WEATHER_API_KEY}`)
    .then(result => result.json())
    .then(result => result.weather[0].main)
    .then(getTerm)
    .then(weatherTerm => {
      weather = weatherTerm;
      return weatherTerm;
    })
    .then(getGifs)
    .then(results => results.data.map(mapGifs))
    .then(gifs => {
      const gif = rand(gifs);

      res.json({
        body: `<p>${weather}</p><img src="${gif.url}" width="${gif.width}" height="${gif.height}" />`
      });
    })
    .catch(err => console.error(err));
}
