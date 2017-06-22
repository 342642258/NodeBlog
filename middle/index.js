//权限控制中间件
//要求下面的路由必须登录后才能访问
exports.checkLogin = function (req, res, next) {
    if (req.session.user){
        next();
    }else{
        res.redirect('/users/login');
    }
};
//要求下面的路由必须未登录后才能访问
exports.checkNotLogin = function (req, res, next) {
    if (req.session.user){
        res.redirect('/');
    }else{
        next();

    }
};
//检测是否为host
exports.checkHost = function (req, res, next) {
    if (req.session.user.username == 666){
        next();
    }else{
        res.render("error");

    }
};