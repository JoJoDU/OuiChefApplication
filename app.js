var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//controllers控制层
//models数据层
//请求过程：
/*
1、用户发起请求，http://localhost:3000/pageCemande

2、node server，发现这个app已经设置了pageCemande的路由

3、然后node server，解析pageCemandeRouter，定位到./app_server/routes/pageCemande.js里面到详细。

4、根据详细路由，然后指定控制器里面到具体操作，例如：pageCemandeRouter.get('/getList',pageCemandeController.getList);，

5、进入控制器，执行getList操作。

6、若getList操作涉及model层，则调用model层相关数据结构。我觉得应该这里操作数据库

6、然后由控制器将数据返回给用户。
*/
//这里引入需要的页面路径，可根据需要新建
var pageAceuilRouter = require('./app_server/routes/pageAceuil');
var usersRouter = require('./app_server/routes/users');
var pageRecetteRouter = require('./app_server/routes/pageRecette');
var pageCommandeRouter = require('./app_server/routes/pageCommande');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//这里配置路径，之后在对应的routes文件里不需要绝对路径
app.use('/', pageAceuilRouter);
app.use('/users', usersRouter);
app.use('/pageRecette', pageRecetteRouter);
app.use('/pageCommande', pageCommandeRouter);

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
