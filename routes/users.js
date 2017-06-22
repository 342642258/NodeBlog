var express = require('express');
var userModel = require('../model/user');
var vaildate = require('../middle/index');
var crypto = require('crypto');
//生成路由实例
var router = express.Router();
//用户注册 当用户通过get方法请求 /users/reg 执行此
//要求登陆前才能访问
router.get('/reg',vaildate.checkNotLogin,function (req, res) {
    res.render('user/reg');
});
//提交用户注册的表单
router.post('/reg',vaildate.checkNotLogin,function (req, res) {
    var user = req.body;
    var name=  req.body.username;
    var password = req.body.password;

    user.avatar = 'https://secure.gravatar.com/avatar/'+md5(user.email);
    user.password = md5(user.password);

    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('用户名请限制在 1-10 个字符');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    userModel.create(user, function (err, doc) {
        if (err){
            req.flash('error','注册失败,已有该用户');
            res.redirect('back');//返回到上一个页面
        }else{
            //把保存之后的用户放置到此用户会话的user属性上
            req.session.user = doc;
            req.flash('success','注册成功');
            res.redirect('/');
        }
    })
        .catch(function (e) {
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('back');
            }
            next(e);
        });
});

//登陆 当用户通过get方法请求 /users/login 执行此
router.get('/login',vaildate.checkNotLogin,function (req, res) {
    res.render('user/login');
});
//提交用户登陆的表单
router.post('/login',vaildate.checkNotLogin,function (req, res) {
    var user = req.body;
    user.password = md5(user.password);
    userModel.findOne(user, function (err, user) {
        if (err){
            req.flash('error',err);
            res.redirect('back');//返回到上一个页面
        }else{
            if (!user) {
                req.flash('error', '错误操作');
                return res.redirect('back');
            }

            req.session.user = user;
            req.flash('success','登录成功');
            res.redirect('/');
        }
    });
});



//退出登录
router.get('/logout',vaildate.checkLogin,function (req, res) {
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/')
});
module.exports = router;
//md5加密算法
function md5(str) {
    return crypto.createHash('md5')
        .update(str)
        .digest('hex');
}
