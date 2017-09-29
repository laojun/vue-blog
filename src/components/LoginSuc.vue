<template>
<div class="box"> 
  <div class="menu">
    <AppMain></AppMain>
  </div>
  <div class="content">
    
  </div>
</div>
</template>

<script>
import AppMain from '@/components/AppMain'
    export default {
      name:"suc",
      data(){
        return {info:"登录成功"}
      },
      components:{
        AppMain
      }
    }
</script>

<style type="text/css" scoped>
  .box{
    background-color: gray;
    height: 500px;
    display: flex;
    justify-content:center;
  }
  .menu{
    background-color: red;
    flex-grow: 1;
  }
  .content{
    background-color: blue;
    height: 300px;
    width: 20px;
    flex-grow: 8
    }
</style>