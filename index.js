const express = require('express');
const app = express();
const Server  = require("http").Server;
const server = Server(app);
const config = require('./config');
const EventEmitter = require('events');

const path = require('path');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
//move to config
server.listen(config.server.port);
console.log('ok');
EventEmitter.defaultMaxListeners = config.db.max + 10;

const routes = require('./app/routes');

app.use('/', routes);


