// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const userSchema = mongoose.Schema({
    account : String,
    password : String
});
//博客的文章schema
const articleSchema = mongoose.Schema({
	title:String,//标题
	date:String,//日期,只读
	tags:Array,//标签
	content:String,//内容
	author:String,//作者
	_user:{
		type:mongoose.Schema.ObjectId,
		ref:'User'
	}
});
articleSchema.statics = {
	findArticleByUser:function(uid,callback){
		return this.findOne({_id:uid}).populate("_user").exec(callback);
	}
}

//tag标签管理
const tagsSchema = mongoose.Schema({
	name:String,//tag标签
	isRe:{
		type:Boolean,
		default:false
	}//是否可删
})



/************** 定义模型Model **************/
const Models = {
    User : mongoose.model('User',userSchema),
    Article : mongoose.model('Article',articleSchema),
    Tags : mongoose.model('Tags',tagsSchema)
}


module.exports = Models;