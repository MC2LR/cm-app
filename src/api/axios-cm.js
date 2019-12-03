import axios from 'axios';
import router from '../router/index'

//自动切换环境
axios.defaults.baseURL = "http://172.16.101.112:9966/api/";
//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';




//请求拦截(请求发出前处理请求)
axios.interceptors.request.use((config) => {
    //console.log(config);

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

// 响应拦截器（处理响应数据）
axios.interceptors.response.use((res) => {
    console.log(res.data.code)
    if(res.data.code === 9){
      localStorage.removeItem('username');
       router.replace({
        path: '/login'
    })
    }
    return res;
  }, (error) => {
    return Promise.reject(error);
  });



  // 封装get方法
function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, params).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    });
}



// 封装post方法
function post(url, params){
    return new Promise((resolve, reject) =>{
        axios.post(url, params).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    });
}


//通过request进行传参
export function request({method, url, data}){
    if(method == 'get'){
        return get(url, data);
    }else if(method == 'post'){
        return post(url, data);
    }
}






// export default {
//     install(Vue) {
//     Vue.prototype.$axios = axios;
//     Vue.prototype.$request = function () {
//             return request;
//         }
//     }
// }

