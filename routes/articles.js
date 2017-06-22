var express = require('express');
var articleModel = require('../model/article');
var multer = require('multer');
var vaildate = require('../middle/index');
var path = require('path');
var async = require('async');

//生成路由实例
var router = express.Router();
//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存文件的路径
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});
var upload = multer({ storage: storage});


router.get('/add',vaildate.checkHost,function (req, res) {
    res.render('article/add',{article:{}});
});
//提交文章数据 里面放的是文件域的名字
router.post('/add',upload.single('img'),function(req,res){
    var article = req.body;
    var _id = article._id;
    if(_id){//有值是表示修改
        //set要更新字段
        var set = {title:article.title,content:article.content};
        if(req.file){//如果新上传了文件，那么更新img字段
            set.img = '/images/'+req.file.filename;
        }
        articleModel.update({_id:_id},{$set:set},function(err,article){
            if(err){
                req.flash('error','更新失败');
                return res.redirect('back');
            }else{
                req.flash('success','更新成功');
                return res.redirect('/');
            }
        });
    }else{
        if(req.file){//如果新上传了文件，那么更新img字段
            article.img = '/images/'+req.file.filename;
        }
        delete(article._id);
        var user =  req.session.user;
        console.log(article);
        article.user = user;//user是个对象，但保存进数据库里的是个ID字符串
        articleModel.create(article,function(err,doc){
            if(err){
                req.flash('error','发表失败');
                return res.redirect('back');
            }else{
                req.flash('success','发表成功');
                return res.redirect('/');
            }
        });
    }
});

//增加文章的详情页
router.get('/detail/:_id',vaildate.checkLogin,function (req, res) {
    async.parallel([
        function(cb){
            articleModel.update({_id:req.params._id},{
                $inc:{pv:1}
            },cb);
        },
        function(cb){
            articleModel.findOne({_id:req.params._id}).populate('user').populate('comments.user').exec(function(err,doc){
                if(err){
                    res.redirect('back');
                }else{
                    cb(null,doc);
                }
            })
        }
    ],function(err,result){
        res.render('article/detail',{article:result[1]});
    });
});

//删除此文章
router.get('/delete/:_id',vaildate.checkLogin,function (req, res) {
    articleModel.remove({_id:req.params._id},function (err, result) {
        if (err){
            req.flash('error','删除失败');
            res.redirect('back');
        }else{
            req.flash('success','删除成功');
            res.redirect('/');
        }
    })
});
//跳转到修改文章页面
router.get('/update/:_id',vaildate.checkLogin,function (req, res) {
    articleModel.findById(req.params._id,function (err, article) {
        res.render('article/add',{article:article});
    })
});

router.get('/myself',vaildate.checkLogin,function (req, res) {
    articleModel.find().populate('user').exec(function (err, articles) {
        if (err){
            return res.redirect('/');
        }
        res.render('article/myself',{articles:articles});
    });

});

router.post('/comment', function(req, res, next) {
     var comment = req.body;
     var _id = comment.article_id;
    articleModel.update({_id:_id},{
        //在comments数组中追加元素
        $push:{comments:{user:req.session.user._id,content:req.body.content}}
    },function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/articles/detail/'+_id);
        }
    });
});
module.exports = router;
