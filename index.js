const express = require('express');
const app = express();
const Server  = require("http").Server;
const server = Server(app);



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
server.listen(9000);
console.log('ok')

const routes = require('./app/routes');

app.use('/', routes);


