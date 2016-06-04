const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', (process.env.PORT || 5000));

const corsOpts = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOpts), require('./lib/typeahead'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
