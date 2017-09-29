import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
//import Hello from '@/components/Hello'
import Login from '@/components/Login'
import LoginSuc from '@/components/LoginSuc'
import Main from '@/components/AppMain'
import Hello from "@/components/Hello"
import List from '@/components/List'
import AddArticle from "@/components/AddArticle"
import store from '@/store'
import Detail from '@/components/Detail'
import UpdateArticle from '@/components/UpdateArticle'

Vue.use(Router)
Vue.use(VueResource);




var router = new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'main/list' }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
    	path: '/LoginSuc',
    	name: 'LoginSuc',
    	component: LoginSuc
    },
    {
    	path: '/main/',
    	name: 'main',
    	component: Main,
    	children:[
    		{
    			path:"hello",
    			component:Hello
    		},
    		{
                name:"main/list",
    			path:'list',
    			component: List,
                meta:{requireAuth:true},//需要检测,            
    		},
            {
                path:'list/:id',
                component:List,
                meta:{requireAuth:true},//需要检测,
            },
            {
                path:"addArticle",
                component:AddArticle,
                meta:{requireAuth:true},//需要检测,
            },
            {
                path:"update",
                component:UpdateArticle,
                meta:{requireAuth:true},//需要检测,
            }
    	]
    }
  ]
})


router.beforeEach((to,from,next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        console.log(store,store.state.accout)
        if(router.app.getCookie("USER")==null){//没有用户
        //if(store && store.state.user==null) {
            if(to.path.indexOf("/list")>-1 && to.query.type!="byMy"){
                next();
            }else{
                next({
                path: '/login',
                //query: { redirect: to.fullPath }
              })    
            }
        }else {
          next();
        }
      } else {
        next() // 确保一定要调用 next()
      }

});

export default router;