const express = require('express');
const http = require('http');
const ejs = require('ejs');

var indexroute = require('./routes/index');
var kontaktroute = require('./routes/kontakt');
var pianinaroute = require('./routes/pianina');
var zasadyroute = require('./routes/zasady');

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use('/', indexroute);
app.use('/index', indexroute);
app.use('/kontakt', kontaktroute);
app.use('/pianina', pianinaroute);
app.use('/zasady', zasadyroute);

app.listen(3000);