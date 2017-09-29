<template>
<div class="footBox">
<span>
	Copyright：&#169;2017  华数传媒网络 <br>
	  @author:zhangxj@wasu.com
</span>
</div>
</template>

<script>
    export default {
      data(){
        return {info:"登录成功，欢迎您"}
      }
    }
</script>

<style type="text/css" scoped>
div{
	background-color: yellow;
	text-align: center;
	height: 70px;
	color: #787A7B;
	background: -webkit-linear-gradient(#DFF1F7,#A2DEF6); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#DFF1F7,#A2DEF6); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#DFF1F7,#A2DEF6); /* Firefox 3.6 - 15 */
    background: linear-gradient(#DFF1F7,#A2DEF6); /* 标准的语法（必须放在最后） */
    
}
div span{
	display: inline-block;
	margin:10px;
}
</style>


