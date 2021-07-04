var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var pageAceuilRouter = require('./app_server/routes/pageAceuil');
var usersRouter = require('./app_server/routes/users');
var pageRecetteRouter = require('./app_server/routes/pageRecette');
var pageCommandeRouter = require('./app_server/routes/pageCommande');
var pageMapRouter = require('./app_server/routes/map');
var pagePayRouter = require('./app_server/routes/paiement');
var pageReussiRouter = require('./app_server/routes/payReussi');
var produitApiRouter = require('./app_server/routes/produit');
//var pageCartRouter = require('./app_server/routes/pageCart');
//var pageAddRouter = require('./app_server/routes/pageAdd');
var recetteDetail=require('./app_server/routes/recetteDetail');
var createRecette=require('./app_server/routes/createRecette');
var recette=require('./app_server/routes/recette');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/produit',produitApiRouter);
//这里配置路径，之后在对应的routes文件里不需要绝对路径
app.use('/', pageAceuilRouter);
app.use('/users', usersRouter);
app.use('/pageRecette', pageRecetteRouter);
app.use('/pageCommande', pageCommandeRouter);
app.use('/paiement', pagePayRouter);
app.use('/map', pageMapRouter);
app.use('/payReussi', pageReussiRouter);
//app.use('/pageCart', pageCartRouter);
//app.use('/add', pageAddRouter);
app.use('/recetteDetail', recetteDetail);
app.use('/createRecette', createRecette);
app.use('/recette',recette)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
