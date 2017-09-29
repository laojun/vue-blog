<template>
<div id="appbox">
<p>
  {{isRegist ? "注册" : "登录"}}
</p>
  <div>
    <label for="account">用户名：</label>
    <input id="account" placeholder="请输入账号" v-model="account"> 
  </div>
  <div>
    <label for="password">密码：</label>
    <input id="password" placeholder="请输入密码" v-model="password" type="password"> 
  </div>
  <div v-if="isRegist">
    <label for="password">确认密码：</label>
    <input id="password" placeholder="请再次输入密码" v-model="password2" type="password">
  </div>

  <p v-if="error" class="error">{{error}}</p>

  <button type="submit" :class="isRegist ? '' : 'getFoc'"  @click="login">登录</button>
  <button type="submit" :class="isRegist ? 'getFoc' : ''" @click="regist">注册</button>

  
</div>
</template>

<script>
    export default {
    data() {
        return {
            account : '',
            password : '',
            password2 : '',
            isRegist:false,
            registState:0,
            error:""
        }
    },
    methods:{
      login() {
        if(this.isRegist==true){
          this.isRegist = false;
          this.registState = 0;
          this.account = "";
          this.password = "";
          this.password2 = "";
          this.error = "";
          return;
        }
        
        if (this.account=="" && this.password=="") {
          this.error = "有空项，请填写"
          return;
        }
        // 获取已有账号密码
        this.$http.get('/api/login/getAccount',{params:{account:this.account,password:this.password}})
          .then(
            (response) => {
              if(response.body.state==1){//登录成功
                console.log("login suc!");
                this.$store.dispatch("actAddUser",response.body.data);
                this.setCookie("USER",response.body.data._id);
                console.log("res="+response);
                this.$router.push("./main");
              }else {//登录失败
                console.log("login failed!");
                this.error = "用户名或密码错误";
              }
              console.log(response)
              //return response;//this.$http.post('/api/login/createAccount',params);
            },
            (response) => {
              console.log(response);
            }
           ).catch((reject) => {
            console.log(reject)
          });
        },
        regist(){
          //第一次切换状态
          this.error = "";
          if (this.registState==0) {
            this.isRegist = true;
            this.registState = 1;
            return;
          }
          //表单验证不为空
          if(this.account=="" || this.password==""){
            this.error = "有空项，请填写"
            return;
          }
          //密码确认不同
          if(this.password != this.password2){
            this.error = "两次密码不同，请确认"
            return;
          }

            //发送注册请求
            var params = {
              account:this.account,
              password:this.password
            }
            this.$http.post('/api/login/createAccount',params)
              .then(
                (resolve) => {
                  console.log("regist suc");
                  this.$store.dispatch("actAddUser",response.body.data);
                  this.setCookie("USER",response.body.data._id);
                
                  this.$router.push('./main');
                },
                (reject) => {
                  console.log(reject);
                  this.error = "注册失败";
                }
              ).catch((reject) => {
                console.log(reject);
                this.error = "注册失败："+reject;
              });                
        }
      },
      
    }
</script>
<style type="text/css" scoped>
#appbox{ height: 500px; background-color: #DFF1F7;  padding-top: 50px;}
#appbox div{margin-bottom: 10px;}
label{display:inline-block;width:80px;text-align:right}  
input{width:240px;height:30px;}  
button{width: 60px; height:30px; }
.getFoc{
  background-color: #999
}
.error{
  color:red;
}
p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
</style>