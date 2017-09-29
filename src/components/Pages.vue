<template>

<ul class="page-bar">
  <li v-show="curPg!=1"><a @click="go(1)">首页</a></li>
  <li v-show='curPg!=1'><a @click="go(curPg-1)">上一页</a></li>
  <li v-for="idx in indexs" :class="{active: curPg==idx}">
    <a @click="go(idx)">{{idx}}</a>
  </li>
  <li v-show='curPg!=totalNum'><a @click="go(curPg+1)">下一页</a></li>
  <li v-show='curPg!=totalNum'><a @click="go(totalNum)">末页</a></li>
        <li><a>共<i>{{totalNum}}</i>页</a></li>
</ul>

</template>

<script>
    export default {
      name:"pages",
      props:[
        'total','cPg'
      ],
      data(){
        const data = {
          maxShow:10,
          curPg:this.cPg,
          totalNum:this.total        
        }
        return data;
      },
      watch:{
        total(){
            this.totalNum = this.total;
        },
        cPg(){
          this.curPg = this.cPg;
        }
      },
      computed:{
        indexs(){//当前显示的页码
          var idxs = [];
          var minIdx = 0;
          var maxIdx = 0;
          if(this.totalNum<=this.maxShow){
              minIdx = 1;
          }else{
              if(this.curPg<(this.maxShow/2)){
                minIdx = 1;
              }else if(this.curPg>=(this.totalNum-this.maxShow/2)){
                minIdx = this.totalNum - (this.maxShow-1);
              }else{
                minIdx = this.curPg - (this.maxShow/2);
                if(minIdx==0)minIdx=1;
              }
              maxIdx = minIdx + this.maxShow -1;
          }
          for(var i=0;i<this.maxShow;i++){
            if(minIdx+i>this.totalNum)break;
            idxs.push(minIdx+i);
          }
          return idxs;
        },
      },
      methods:{
        go(idx){
          if(idx!=this.curPg){
            this.curPg = idx;
            this.$emit('changePg',this.curPg);
          }
        },
        goPrev:function(){
          this.curPg -= 1;
          this.$emit('changePg',this.curPg);
        },
        goNext:function(){
          this.curPg += 1;
          this.$emit('changePg',this.curPg);
        }
      }
    }
</script>

<style type="text/css" scoped>
  ul,li{
    margin: 0;
    padding: 0;
  }
  .page-bar{
  }
  .page-bar li{
    list-style: none;
    display: inline-block;
  }
.page-bar a {
  border: 1px solid #337ab7;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  cursor: pointer
}

.page-bar a:hover {
    background-color: #eee;
}

.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

.page-bar i {
  font-style:normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
</style>