const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();



app.set('views', path.join(__dirname, 'views')); //middlewares pasta views
app.set('view engine', 'ejs');   //middlewares template engine ejs
app.use(cookieParser('codingplay'));
app.use(expressSession({
  secret: 'blocos', 
  resave: false, 
  saveUninitialized: false,
  cookie:{
      tipo: undefined
  }
}));

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use(bodyParser.json()); //middlewares cria objeto JSON vindo de form HTML
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //middlewares arquivos estáticos(imagens,css,js)

consign({})
    .include('src/models')
    .then('src/controllers')
    .then('src/routes')
    .into(app)
;

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
    console.log('CodeMirror no ar');
});
