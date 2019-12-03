<template>
  <div class="user-info">
    <h3 class="titles" >{{titData}}</h3>
    <div class="userWriper">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="back">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "commonInfo",
  data() {
    return {
      username: "",
    };
  },
  props:{
    titData:String
  },
  created() {
    this.toUserName();
  },
  methods: {
    toUserName() {
      this.username = localStorage.getItem("username");
    },
    back() {
      var that = this;
      this.axios
        .post("user/logout")
        .then(function(response) {
          console.log(response.data.code);
          if (response.data.code == 0) {
            localStorage.removeItem("username");
            that.$router.push({
              name: "login"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.user-info {
  width: 100%;
  height: 55px;
  background: #f2f2f2;
  overflow: hidden;
  display: -webkit-flex;
  justify-content: space-between;
}
.userWriper {
  line-height: 55px;
  margin-right: 20px;
}
.titles{
  width: 300px;
  height: 55px;
  line-height: 55px;
  margin-left: 20px;
  text-align: center;
}
</style>