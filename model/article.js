//引入模块
var mongoose = require('mongoose');

//定义模型
var articleSchema = new mongoose.Schema({
    title : String,
    content : String,
    img : String,
    pv:{type:Number,default:0},
    user: {type:mongoose.Schema.Types.ObjectId,ref:'user'},//引用user模型
    //发表日历 类型是Date，默认值是now当前时间
    comments:[{//评论的一个数组
        content:{type:String},//评论的内容
        createAt:{type:Date,default:Date.now()}//评论的时间
    }],
    createAt: {type:Date,defalut:Date.now}
});
//定义model
var articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;


