var express = require('express');
var path = require('path');
//处理收藏夹图标的
var favicon = require('serve-favicon');
//写日志的，输出到控制台
var logger = require('morgan');
//解析cookie的 req.cookie方法用来设置cookie  req.cookies 把请求的cookies封装
var cookieParser = require('cookie-parser');
//解析请求体的req.body
var bodyParser = require('body-parser');
//加载路由 根据请求的路径不同，进行不同的处理
var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
// var config = require('config-lite')(__dirname);
var session = require('express-session');
//数据库保存
var MongoStore = require('connect-mongo/es5')(session);
//引入模块
var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/node');
var flash = require('connect-flash');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//设置对于html格式的文件，渲染的时候委托ejs的渲染方法来进行渲染
app.engine('html',require('ejs').renderFile);
//使用会话中间件，req.session
app.use(session({
    secret: '2017node',
    resave: false,
    //指定保存的位置
    saveUninitialized: false,// false代表没有session'
    // cookie: {
    //     maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    // },
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//解析JSON类型的请求请求 通过请求中的Content-Type {}
app.use(bodyParser.json());
//解析urlencoded类型的请求请求 通过请求中的Content-Type {}
app.use(bodyParser.urlencoded({ extended: false }));
//静态文件服务中间件
app.use(cookieParser());
//指定静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
//配置模板的中间件
app.use(function(req,res,next){
    //res.locals才是真正的渲染模板的对象
    res.locals.user = req.session.user;
    //flash取出来的是一个数组
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
app.use('/', index);
// / 是一级目录
app.use('/users', users);
app.use('/articles', articles);
//  捕获404的错误并且转发到错误处理中间件去
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理 不暴露给用户
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
