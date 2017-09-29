<template>
<div class="menubox">
<ul class="menus">
  <li v-for="menu in menus" @click="doMenu">
    <router-link :to="menu.target" >{{menu.name}}</router-link>
  </li>
<!--   <li>
    <router-link to="/main/addArticle" @click.native='flush'>添加文章</router-link>
  </li> -->
</ul>

<div class="input">
  关键字查询：
  <input v-model='inputVal' placeholder="输入后按确认键查询" @keyup.enter="searchInput">
  <span style="font-size: 12px; display: block;">多个关键字之间使用','分隔</span>
</div>

  <div class="tagBox">
  点击标签搜索：
  <ul class="tags">
    <li v-for="(tag,idx) in tags" @click="doTag(idx)" v-bind:class="{choosen:chsTag['chs'+idx]}">
      {{tag.name}}
    </li>
  </ul>
  </div>
  
</div>
</template>

<script>
    export default {
      name:"main-menu",
      data(){
        const menus = [
          {name:"所有文章",target:"/main/list"},
          {name:"我的文章",target:"/main/list?type=byMy"},
          
          {name:"添加文章",target:"/main/addArticle"}          
        ]
        const data = {
          menus,
          chooseTag:[],
          chsTag:{},
          inputVal:"",
          tm:null
        }
        return data;
      },
      computed:{
        tags(){
          return this.$store.state.tags
        }
      },
      methods:{
        flush(){//强制路由刷新：在路由中添加@click.native='flush'
          
          //方案一：使用强制刷新路由
　　　　　　//router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
          //this.$router.go(0)

          //方案二：event Bus
          this.$router.push({
            path:'/main/addArticle',
            query:{
              t: 7
            }
          })
        },
        doTag(tagIdx){//点击标签搜索
          if(this.chsTag['chs'+tagIdx]===undefined){
            //this.chsTag['chs'+tagIdx] = true;
            this.$set(this.chsTag, 'chs'+tagIdx, true);
            this.chooseTag.push(this.tags[tagIdx].name);
          }else if(this.chsTag['chs'+tagIdx]==false){
            this.$set(this.chsTag, 'chs'+tagIdx, true)
            this.chooseTag.push(this.tags[tagIdx].name);
          }else if(this.chsTag['chs'+tagIdx]==true){
            this.$set(this.chsTag, 'chs'+tagIdx, false)
            this.chooseTag.remove(this.tags[tagIdx].name);
          }

          // // 函数防抖
          // var that = this;
          // dbc.debounce(function() {
          //     //异步调用查询
          //     that.searchData();
          // }, 300);
          var that = this;
          clearTimeout(this.tm);
          this.tm = setTimeout(function(){
              that.goList();
          },1000)

        },
        searchInput(){
          console.log("searchInput="+this.inputVal);
          this.doMenu();
          if(this.inputVal.length>0){
            this.$router.push('/main/list?type=byVal&val='+this.inputVal)
          }
        },
        doMenu(){//点击了列表菜单，则要把标签查询去掉
            for(var key in this.chsTag){
              this.$set(this.chsTag,key,false)
            }
            this.chooseTag = [];
        },
        goList(){
            console.log('search')
            this.$router.push("/main/list?type=byTag&tags="+this.chooseTag);
        }

      }
    }


// debounce接收三个参数:
// @params fn: 需要进行函数防抖的函数;
// @params wait: 需要等待的时间, 单位为毫秒;
// @params immediate: 如果为true, 则debounce会在调用时立刻执行一次fn,
//                    而不需要等到wait结束后.

var dbc={};
dbc.debounce = function(fn, wait, immediate) {
    var timeout,
        args,
        context,
        timestamp,
        result;

    var later = function() {
        var last = new Date() - timestamp;

        if(last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if(!immediate) {
                result = fn.apply(context, args);

                if(!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date()
        var callNow = immediate && !timeout;

        if(!timeout) {
            timeout = setTimeout(later, wait);
        }

        if(callNow) {
            result = fn.apply(context, args);
            context = args = null;
        }

        return result;
    }
};




/**
*删除数组指定下标或指定对象
*/
Array.prototype.remove=function(obj){
for(var i =0;i <this.length;i++){
var temp = this[i];
if(!isNaN(obj)){
temp=i;
}
if(temp == obj){
for(var j = i;j <this.length;j++){
this[j]=this[j+1];
}
this.length = this.length-1;
}
}
}
</script>

<style type="text/css" scoped>
.menubox{
  color:#055A7C;
}

  li{
    list-style: none;
    margin: 0px;
  }
  .tags{text-align: left; width: 100%; height: auto;}
  ul{
    margin:0px; padding: 0px;
  }
  .tags li{
     width: auto;
    display: inline-block;
    height: 20px; border: 1px solid #337ab7;
    margin:5px; font-size: 12px;
    cursor: pointer;
  }

.tagBox{
    margin-top: 20px;
    padding-top:10px;
  padding-bottom: 10px;
  background: -webkit-linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* Safari 5.1 - 6.0 */
  background: linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* 标准的语法（必须放在最后） */
  }
.choosen{
  background: #337ab7; color: #fff;
}
.input{
  margin-top: 20px;
  padding-top:10px;
  padding-bottom: 10px;
  background: -webkit-linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* Safari 5.1 - 6.0 */
  background: linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* 标准的语法（必须放在最后） */
}
.input input{
  width: 90%;
  height: 25px;
  margin-bottom: 10px;

}
.menus{
  margin-top: 30px;
}
ul.menus li a{
  text-decoration: none;
  display: block; 
  width: 100%; 
  height: 40px; 
  margin-bottom: 2px;
  background: -webkit-linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* Safari 5.1 - 6.0 */
  background: linear-gradient(#93D2EB,#BCE7F8,#93D2EB); /* 标准的语法（必须放在最后） */
  line-height: 40px;
  color:#055A7C;
  
}

ul.menus li a:hover{
  background: -webkit-linear-gradient(#50AACD,#A8E1F7,#50AACD); /* Safari 5.1 - 6.0 */
  background: linear-gradient(#50AACD,#A8E1F7,#50AACD); /* 标准的语法（必须放在最后） */
}

</style>
