<template>

<article>
  <h2>{{article.title}}</h2>
  <p>{{'作者：'+article.author+"    标签："+article.tags}}</p>
  <p>{{article.content}}</p>
</article>

</template>

<script>
    export default {
      name:"detail",
      data(){
        var data = {
          //queryid:this.$router.params.id,
          article:{}
        }
        return data;
      },
      created(){
        this.getData();
      },
      methods:{
        getData(){
          let params = {id:this.$route.params.id}
          this.$http.get('/api/article/getOne',{params})
              .then(
                (res) => {
                  console.log("get article detail suc");
                  this.article = res.body;
                  //console.log(this.total)
                },
                (res) => {
                  console.log("get article detail failed :"+JSON.stringify(res));
                }
              ).catch((reject) => {
                console.log("get article detail failed : reject="+reject);
              });
          }
        }
    }
</script>
<style type="text/css" scoped>
 article{
  background-color: #fff;
 }
</style>