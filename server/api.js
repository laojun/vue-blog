const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.User({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});

router.get("/api/logout",(req,res) => {
    var state = {state:1,msg:"退出成功"};
    res.send(state);
    return;
    req.session.destory(function(err){
        if(err){
            res.send({state:0,msg:"退出登录失败"});
            return;
        }
        res.clearCookie("zxjKey");
        res.send({state:1,msg:"退出成功"})
    })
})

// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    const user = {account:req.query.account,password:req.query.password};
    
    // models.Login.find((err,data) => {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         res.send(data);
    //     }
    // });

    //console.log(req.parmas.account)
    //var sess = req.seesion;
    models.User.findOne(user,(err,data) => {
        var state = {state:0,msg:"",des:"",data:null};
        if(err || data===null){
            state.msg = "failed";
            state.des = err;
            res.send(state);
        }else{
            state.msg = "suc";
            state.data = data;
            state.state = 1;
            res.send(state);
            return;
            //登录成功设置session
            req.session.regenerate(function(err) {
                if(err){
                    return res.send({state:0, msg:'登录失败：session',des:"",data:null});                
                }
                req.session.loginUser = data._id;
                res.send(state);                         
            });
        }
    })

});

// router.get("/api/login/checkAccount",(req,res) => {
//     models.
// })
//保存文章
router.post('/api/article/add',(req,res) => {
    const article = new models.Article({
        title:req.body.title,
        date:req.body.date,
        tags:req.body.tags,
        content:req.body.content,
        author:req.body.author,
        _user:req.body._user
    })
    article.save((err,data) =>{
        if(err){
            console.log("failed:"+err);
            res.send("save article failed : "+err);
        }else{
            console.log("suc:"+data);
            res.send(data);
        }
    });
});
//删除文章：byId
router.post('/api/article/remove',(req,res) =>{
    var cdt = {_id:req.body.artId}
    models.Article.remove(cdt,(err,data) => {
        if(err){
            res.send("remove article failed : "+err)
        }else{
            res.send("remove article suc");
        }
    })
});
//修改：
router.post("/api/article/update",(req,res) => {
    var cdt = {_id : req.body.artId};
    const newArt = {
        title:req.body.title,
        date:req.body.date,
        tags:req.body.tags,
        //author:req.body.author,
        content:req.body.content
    }
    console.log(cdt._id,req.body.artId);
    console.log(JSON.stringify(req.body))
    models.Article.update(cdt,{$set:newArt},(err,data) => {
        if(err){
            console.log("update article failed:"+err)
            res.send("update article failed : "+err)
        }else{
            console.log("update article suc:"+JSON.stringify(data))
            res.send("update article suc");
        }
    })
})
//查询所有
router.get('/api/article/get',(req,res) => {
    const params = {
        type:req.query.type,
        page:req.query.page,
        len:req.query.len,
        conditions:req.query.conditions
    };
    console.log("get article conditions="+params.conditions)
    var cdts = {};
    if(params.type=="all"){//查询所有
        
    }else if(params.type=="byTag"){//查询标签
        var tags = params.conditions.split(",");
        cdts = {'tags':{$all:tags}};
    }else if(params.type=="byVal"){//查询输入：匹配title/tag/content
        let p = params.conditions.split(",");//多字符串匹配，通过,分隔
        let regStr = "";
        for(let i=0;i<p.length;i++){
            regStr += "(?=.*?"+p[i]+")"
        }
        cdts = {$or:[
                 {'tags':{$all:p}},
                 {'title':new RegExp(regStr)},
                 {'content':new RegExp(regStr)}
                 //{'title':new RegExp("^.*"+params.conditions+".*$")},
                 //{'content':new RegExp("^.*"+params.conditions+".*$")}
            ]};
    }else if(params.type=="byMy"){//查询我的
        cdts = {_user:params.conditions};
    }
        // 通过模型去查找数据库
        models.Article.count(cdts,(err,count) => {
            models.Article.find(cdts)
                .skip((params.page-1) * params.len)
                .limit(params.len * 1)
                .sort({"-createtime":1})
                .exec((err,data) => {
                    if(err){
                        res.send(err);
                    }else{
                        var dt = {data:data,count:count}
                        res.send(dt);
                    }
                })    
        })
});

//查询单个
router.get('/api/article/getOne',(req,res) => {
    const query = {_id:req.query.id};
    models.Article.findOne(query,(err,data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data)
        }
    })
})

//查询byId
router.get('/api/article/getById',(req,res) => {
    // 通过模型去查找数据库
    var cdt = {_id:req.body.id};
    models.Article.findArticleByUser(cdt,(err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//查询所有tag
router.get('/api/tags/get',(req,res) => {
    models.Tags.find((err,data) => {
        if (err) {
            res.send({state:0,msg:err,data:null});
        } else {
            res.send({state:1,msg:'suc',data:data});
        }
    });
});
//删除tag
router.post('/api/tags/remove',(req,res) => {
    var cdt = {_id:req.body.tagId}
    models.Tags.remove(cdt,(err,data) => {
        if(err){
            res.send("remove tag failed : "+err)
        }else{
            res.send("remove tag suc");
        }
    })
});

//添加tag
router.post('/api/tags/add',(req,res) => {
    const tag = new models.Tags({
        name:req.body.name,
        isRe:false
    })
    tag.save((err,data) =>{
        if(err){
            console.log("failed:"+err);
            res.send("save tags failed : "+err);
        }else{
            console.log("suc:"+data);
            res.send(data);
        }
    });
});




module.exports = router;