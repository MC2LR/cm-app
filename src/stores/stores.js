import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


const state = {
	userInfo:{
		userName:"",
		passWord:""
	},
	title:"大数据平台管理"
}

const mutations = {
  setValue(state,counts){
	  state.title = counts;
  }
}

 const  getters ={
   
  }

export default new Vuex.Store({
	state,
	getters,
	mutations,
})
