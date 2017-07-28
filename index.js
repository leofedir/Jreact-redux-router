const express = require('express');
const session = require('express-session');
const app = express();
const Server  = require("http").Server;
const server = Server(app);
const config = require('./config');
const EventEmitter = require('events');
const cookieParser = require('cookie-parser');

const path = require('path');

const swig= require('swig');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
     cookie: { secure: false }
}))






app.use(function (req, res, next) {

    res.removeHeader("X-Powered-By");
    next();
});
const swigRenderer = new swig.Swig({"cache" : false});
app.use(express.static(path.join(__dirname, './public-src')));

app.use(express.static('./public-src'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.set('views', './views');
app.engine('html', swigRenderer.renderFile);
app.set('view engine', 'html');



//move to config
server.listen(config.server.port);
console.log('ok');
//EventEmitter.defaultMaxListeners = config.db.max + 10;




const routes = require('./app/routes');

app.use('/', routes);
