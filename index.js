const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.get('/typeahead', require('./lib/typeahead'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
