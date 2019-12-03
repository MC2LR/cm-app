
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from './stores/stores'
import axios from 'axios';
//对路由的兼容
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 全局守卫到登录页
router.beforeEach((to, from, next) => {
  let username = localStorage.getItem("username");
  //如果有token的话说明你已经登录,让你正常登录
  if (username) {
    if(to.path === "/login"){
      next({ path:"/dataplatform"});
    }else{
      next();
    }
  } else {
    //如果没有登录你访问的不是login就让你强制跳转到login页面
    if (to.path !== "/login") {
      next({ name: "login"});
    } else {
      next();
    }
  }
});

// 代码高亮全局指令
import hljs from 'highlight.js';
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
import 'highlight.js/styles/monokai-sublime.css';
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

// axios.defaults.baseURL = "http://172.16.101.112:9966/api/";
// //设置超时时间
// axios.defaults.timeout = 10000;
Vue.use(ElementUI);

Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
