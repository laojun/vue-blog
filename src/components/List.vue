<template>
<div class="listBox">
<div v-if="!isDetail" class="list">
  
  <ul>
    <li v-for="(item,index) in lists">
      <div class="item" :class="{my:curUid==item._user}" @click="toDetail(index,item._id)">
        <h3>{{index + item.title}}</h3>
        <span class="content" v-html="item.content"></span>

        <a v-if="curUid==item._user" class="mod" @click.stop="delArticle(item._id)">删除</a>
        <a v-if="curUid==item._user" class="mod" @click.stop="updateArticle(item._id)">修改</a>
      </div>
    </li>
  </ul>

  <Pages v-if="!total==0" :cPg="curPg" :total="total" @changePg="chgPg"></Pages>
</div>

<div v-if="total==0">
  暂无数据
</div>

<article v-if="isDetail">
  <h2>{{curArt.title}}</h2>
  <p>{{'作者：'+curArt.author+"    标签："+curArt.tags}}</p>
  <p v-html="curArt.content" style=""></p>
</article>

</div>
</template>

<script>
import Pages from "@/components/Pages"

    export default {
      name:"List",
      data(){
        let data = {
          type:"all",//this.$route.params.type,//列表数据类型：all(所有)，my(我的)等等查询条件
          curPg:1,//当前页码,
          len:10,//每页个数
          lists:[],//数据,
          total:1,//总页码
          isDetail:false,
          curArt:{},//当前点击的文章,
          queryCdt:{},//查询条件：按标签，an
        };
        return data;
      },
      computed:{
        curUid(){
          var user = this.$store.state.user;
          return user ? user._id : "";
        }
      },
      created(){
        console.log("list create")
        this.getData();
      },
      watch:{
        curPg(){
          this.getData();
        },
        $route (to,from){
          console.log("route chagne")
            var tq = to.query;
            var fq = from.query;
            if(tq.idx){//当前路由为列表进入详情页
              if(tq.idx>(this.lists.length-1)){
                return;
              }
              this.isDetail = true;
              this.curArt = this.lists[parseInt(tq.idx,10)];
              return;
            }
            if(fq.idx){//当前路由为详情页回到列表
              this.isDetail = false;
              this.curArt = {};
              return;
            }
            this.queryCdt = '';
            this.lists = [];
            this.curPg = 1;//充值初始
            if(tq.type=="byTag"){//当前路由为标签查询
                this.type = "byTag";
                if(!tq.tags)this.type="all";
                this.queryCdt = tq.tags;

            }else if(tq.type=="byVal"){//当前路由为按输入查询
                this.type="byVal";
                this.queryCdt = tq.val;
            }else if(tq.type=="byMy"){//按我的列表查询
                this.type = "byMy";
                this.queryCdt = this.curUid;//
            }else{
                this.type = 'all';
                this.queryCdt = "";
            }
            this.getData();
        },
      },
      methods:{
        getData(){
          //.type = "all";
          let params = {type:this.type,page:this.curPg,len:this.len,conditions:this.queryCdt};
          console.log("get list conditions="+JSON.stringify(params));
          this.$http.get('/api/article/get',{params})
              .then(
                (res) => {
                  console.log("get article suc");
                  this.lists = res.body.data;
                  this.total = Math.ceil(res.body.count/this.len);
                  //console.log(this.total)
                },
                (res) => {
                  console.log("get article failed :"+JSON.stringify(res));
                }
              ).catch((reject) => {
                console.log("get article failed : reject="+reject);
              });
        },
        chgPg(num){//提供给page组件emit的方法
          //alert(num);
          this.curPg = num;
        },
        toDetail(index,id){
          console.log(index,id)
          this.$router.push("./list/?idx="+index);
          //this.$router.push('./list/'+id);
        },
        updateArticle(id){
          this.$router.push('./update/?id='+id);
        },
        delArticle(id){
            var cf = confirm("是否确认删除？");
            if(cf==true){
              var params = {artId:id}
              this.$http.post('/api/article/remove',params)
                  .then(
                    (resolve) => {
                      console.log("del article suc");
                      //this.$store.dispatch('updateTags');
                      this.curPg = 1;//回到第一页
                      this.getData();
                    },
                    (reject) => {
                      console.log("del article failed : "+reject);
                    }
                  ).catch((reject) => {
                    console.log("del article failed : reject="+reject);
                    
                  }); 
            }
        }
      },
      components:{
        Pages
      }
    }
</script>

<style type="text/css" scoped>

.list{

}  
ul .item{
  border-top: 1px solid #ccc;
  width: 100%;
  height: 100px; 
  margin: 0px;
  text-align: left;
  cursor: pointer;
}
ul li{
  list-style: none;
}
.item h3{
  display: inline-block;
  margin: 0px;
  margin-left: 5px;
  width: 200px;
  height: 90%;
  text-overflow:ellipsis;
}
.mod{
  float: right;
  display: inline-block;
  margin-right: 5px;
  color:red;

}
.content{
  display: inline-block;
  width: 500px; 
  height: 90%;
  text-overflow:ellipsis;
}
.my{

}
.listBox{
  color:#013F57;
}

</style>
