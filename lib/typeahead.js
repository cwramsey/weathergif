'use strict';

const zipcodes = require('zipcodes');

module.exports = (req, res) => {
  const text = req.query.text;

  if (!text || text.length < 5) {
    res.json([{
      title: `<i>Enter your zipcode.</i>`,
      text: ''
    }]);
    return;
  }

  const {city, state, zip} = zipcodes.lookup(text);

  res.json([{
    title: `<i>${zip}: ${city}, ${state}</h1>`,
    text: zip
  }]);
}
