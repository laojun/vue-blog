<template>
<div class="box">
  <div class="menu">
    <AppMenu></AppMenu>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
    import AppMenu from "@/components/Menu"
    import Hello from "@/components/Hello"

    export default {
      name:"app-main",
      data(){
        return {info:"我是页中"}
      },
      components:{
      	AppMenu,
      	Hello
      }

    }
</script>

<style type="text/css" scoped>
  .box{
    height: auto;
    display: flex;
    justify-content:center;
    background-color: #DFF1F7;
  }
  .menu{

    flex-grow: 9;
    flex-basis: 0%;
  }
  .content{
    border-left: 1px solid #ccc;
    height: auto;
    flex-grow: 35;
    min-height: 500px;
    flex-basis: 0%;

    }
</style>