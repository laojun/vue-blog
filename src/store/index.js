// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const mutations = {
  addUser(state,user) {
    //在这里改变state中的数据
	 state.user = user;
   if(!window.localStorage.user)window.localStorage.user = JSON.stringify(user)
  },
  delUser(state){
  	state.user = null;
    window.localStorage.setItem('user',"");
  },
  initUser(state,user){
    state.user = user;
  },
  updateTags(state,tags){
    state.tags = tags.slice(0);
  }
}
//定义Actions
const actions = {
  actAddUser({ commit },user) {
    //dosomething
    
    commit('addUser',user);
  },
  actDelUser({commit}){
    commit('delUser');
  },
  initUser({commit}){
    if(window.localStorage.user){
      var user = JSON.parse(window.localStorage.user);
      commit('initUser',user);  
    }
  },
  updateTags({commit}){
            // 获取所有标签
        Vue.http.get('/api/tags/get')
          .then(
            (response) => {
              if(response.body.state==1){//查询成功
                console.log("get tags suc!");
                commit('updateTags',response.body.data)
              }else {//查询失败
                console.log("get tags failed!");
              }
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

const vuex_store = new Vuex.Store({
	state:{
		user:null,
    name:"zxj",
    tags:[],
	},
	mutations,
	actions
})
export default vuex_store;

