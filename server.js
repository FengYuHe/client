var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var logger = require('morgan');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var partials = require('express-partials');

var index = require('./router/index');
var api = require('./lib/api')
var mqtt = require('./lib/mqtt');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(partials());
app.use(favicon());
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', index);
app.use('/api',api);
app.use('/send',mqtt);

app.listen('9001');
