'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOptions), require('./lib/typeahead'));
app.get('/resolver', cors(corsOptions), require('./lib/resolver'));

app.listen(process.env.PORT || 9145);
