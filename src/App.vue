<template>
<div>
  <AppHead></AppHead>
  <div id="app">
    <router-view></router-view>
  </div>
  <AppFoot></AppFoot>
</div>
</template>

<script>
import AppHead from '@/components/AppHead.vue'
import AppFoot from '@/components/AppFoot'
export default {
  name: 'app',
  created(){
    this.$store.dispatch("updateTags");
  },
  components:{
    AppHead,
    AppFoot
  }
}
</script>

<style>
body{
  margin:0px;
  color:#055A7C;
}
#app {
  font-family: 黑体,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
