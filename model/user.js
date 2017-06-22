//引入模块
var mongoose = require('mongoose');

//定义模型
var userSchema = new mongoose.Schema({
    username : {
      type: String,
        unique: true //唯一
    },
    password : String,
    email : String,
    avatar : String,
    createAt: {type:Date,defalut:Date.now}
});
//定义model
var userModel = mongoose.model('user', userSchema);

module.exports = userModel;


