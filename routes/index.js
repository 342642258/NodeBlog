var express = require('express');
var articleModel = require('../model/article');
var markdown = require('markdown').markdown;
//理由实例
var router = express.Router();

/* 当用户访问/ 执行回调函数 */
// / 当前路由的根目录
router.get('/', function(req, res, next) {
  //用数据渲染模板 从session中获取用户信息
    //第二个参数对象最后会合并到res.locals上
    //先配置参数，然后再执行查询
    //查询出来的user是ID，通过转成对象
  articleModel.find().populate('user').exec(function (err, articles) {
    if (err){
      req.flash('error',error);
      return res.redirect('/');
    }
      // articles.forEach(function (article) {
      //     article.content = markdown.toHTML(article.content);
      // });
      res.render('index', {articles:articles});
  });

});

module.exports = router;
