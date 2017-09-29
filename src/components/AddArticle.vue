<template>

<div class="add-box">
<div v-if="!addEnd">
  
<p>
  添加文章
</p>
  <div class="add-itm">
    <label for="title">标题:</label>
    <input type="text" name="title" id="title" placeholder="请输入标题" v-model="title" required class="right">
  </div>
  <div class="add-itm">
  <label for="title">标签:</label>
  <div class="right">
    <ul>
      <li class="tag" v-for="(tag,idx) in tags" @click="doTag(idx,$event)" v-bind:class="{choosen:chsTag['chs'+idx]}">
        <span>{{tag.name}}</span>
      <span v-if="!tag.isRe" class="del" @click="delTag(tag._id)">x</span>
      </li>
    </ul>
    <input type="text" name="tags" id="tags" placeholder="输入标签,按确定键添加" v-model="newTag" @keyup.enter="addTag">
  </div>
    
  </div>
  <div class="add-itm">
    <label for="content">描述:</label>
    <textarea  name="content" id="content" placeholder="请输入内容" required v-model="content" class="right"></textarea>
  </div>
  <button @click="add">提 交</button>
</div>

<div v-if="addEnd">
  <p>{{tip}}</p>
  <button @click='back'>返回</button>
</div>

</div>

</template>

<script>
    export default {
      name:"add-article",
      data(){
        var data = {
          title:"",
          //tags:"",
          chooseTag:[],
          chsTag:[],
          content:"",
          tip:"",
          newTag:'',
          addEnd:false
        }
        return data;
      },
      beforeRouteUpdate(to, from, next){
        console.log("====beforeRouteEnter")
        console.log(to)
        //vm.addEnd = false;
      },
      computed:{
        tags(){
          return this.$store.state.tags;
        },
      },
      methods:{
        add(){
          var params = {
            title:this.title,
            date:new Date(),
            tags:this.chooseTag,
            content:this.content.replace(/\n|\r\n/g,"<br>"),
            author:this.$store.state.user.account,
            _user:this.$store.state.user
          }
          if(!params.title || !this.content){
            alert("有空项，请检查填写");
            return;
          }
          this.$http.post('/api/article/add',params)
              .then(
                (resolve) => {
                  console.log("add article suc");
                  this.tip = "添加成功";
                  this.addEnd = true;
                },
                (reject) => {
                  console.log("add article failed : "+reject);
                  this.tip = "添加失败";
                  this.addEnd = true;
                }
              ).catch((reject) => {
                console.log("add article failed : reject="+reject);
                this.tip = "添加失败";
                this.addEnd = true;
              });
        },
        back(){
          this.addEnd = false;
          this.tip = ""
        },
        delTag(_id){
          var params = {tagId:_id}
          this.$http.post('/api/tags/remove',params)
              .then(
                (resolve) => {
                  console.log("del tag suc");
                  this.$store.dispatch('updateTags');
                },
                (reject) => {
                  console.log("del tag failed : "+reject);
                }
              ).catch((reject) => {
                console.log("del tag failed : reject="+reject);
                
              });
        },
        doTag(tagIdx,evt){
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
          return;
          
        },
        addTag(){
          var params = {name:this.newTag}
          this.$http.post('/api/tags/add',params)
              .then(
                (resolve) => {
                  console.log("add tag suc");
                  //this.tip = "添加成功";
                  //this.addEnd = true;
                  this.newTag = "";
                  this.$store.dispatch("updateTags");
                },
                (reject) => {
                  console.log("add tag failed : "+reject);
                  this.newTag = "";
                }
              ).catch((reject) => {
                console.log("add tag failed : reject="+reject);
                this.newTag = "";
              });
        }
      }
    }
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
  .add-box{
    width: 100%;
    height: auto;
    margin-top: 0px;
  }
  .add-box .add-itm{
    width: 80%;
    margin:auto;
    text-align: left;
    display: flex;
    justify-content:center;
  }
  .add-box p{
    margin:0;
    display: block;
  }
  
  label{
    display: inline-block;
    width: 100px;
    text-align: right;
    flex-grow: 1;
  }
  .right{
    margin-left: 20px;
    width: 500px;
    flex-grow: 9;
    display: inline-block;
  }
  input{
    height: 30px;

  }

  textarea{
    width: 500px; height: 300px; margin-left: 20px; margin-top: 5px;
    flex-grow: 9; display: inline-block;
    border: 1px solid #999;
  }
  button{
    width: 60px;height: 30px; margin: 5px;
  }
  .tag{
    list-style: none; display: inline-block; width: auto; height: 20px; border: 1px solid #ddd;
    text-align: center; line-height: 20px; margin: 3px; padding: 2px; font-size: 12px; position: relative;
    cursor: pointer; background-color: transparent;
  }
  .right ul{
    -webkit-margin-before: 0.5em;
    -webkit-margin-after: 0.5em;
    margin:0px; padding: 0px;

  }

  #tags{
    width: 150px;
  }
  .tag:hover{
    background-color: #337ab7;
  }
  .tag:hover .del{
    display: inline-block;
  }
.choosen{
  background: #337ab7;
}

  .del{
    background-color: red; width: 8px; height: 8px; font-size: 5px; display: none; right: 0px; position:absolute;top: -4px; right: -4px; line-height: 8px; text-align: center;
  }
 </style>