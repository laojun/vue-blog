<template>
<div>
<span class="head-info">{{info}}</span>

	



<a @click="logout" href="javascript:void(0);">{{isLogin ? '注销' : '登录'}}</a>
<span class="head-user">{{'欢迎您，'+userName }}</span>
</div>
</template>

<script>
    export default {
      
      data(){
      	var data = {
      		info:"Wasu Bug List",
      		//isLogin:false
      	}
        return data;
      },
      computed:{
      	isLogin(){
      		return this.$store.state.user ? true : false;
      	},
      	userName(){
      		var user = this.$store.state.user;
      		return user ? user.account : "陌生人";
      	}
      },
      methods:{
      	logout(){
      		if(!this.isLogin){//当前未登录，去登录
				this.$router.push('/login');
				return;
      		}
			// 获取已有账号密码
        this.$http.get('/api/logout')
          .then(
            (response) => {
              if(response.body.state==1){//登录成功
                console.log("logout suc!");
                this.$store.dispatch("actDelUser");
                this.delCookie("USER");
                this.$router.push("/");
              }else {//登录失败
                console.log("logout failed!");
              }
              //console.log(response)
              //return response;//this.$http.post('/api/login/createAccount',params);
            },
            (response) => {
              console.log(response);
            }
           ).catch((reject) => {
            console.log(reject)
          });
      	}
      }
    }
</script>

<style type="text/css" scoped>
div{
	height: 70px;
	width: 100%;
	background: -webkit-linear-gradient(#A2DEF6,#DFF1F7); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#A2DEF6,#DFF1F7); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#A2DEF6,#DFF1F7); /* Firefox 3.6 - 15 */
    background: linear-gradient(#A2DEF6,#DFF1F7); /* 标准的语法（必须放在最后） */
    /*border-bottom: 1px solid #ccc;*/
}
a{
	display: inline-block; float: right;
	margin: 10px; margin-right: 30px;
}
.head-user{
	display: inline-block; float: right;
}
span{
	display: inline-block; margin:10px;
	color: #055A7C;
}
.head-info{
	font-weight: bold;
	text-shadow: 5px 5px 5px #585F62;
	font-size: 30px;
	font-style:oblique;
}

</style>


