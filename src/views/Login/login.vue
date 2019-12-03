<template>
  <div class="login">
    <div class="login-wraper">
      <el-form
        class="login-form"
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
      >
        <p style="font-size:24px; text-align:center">系统登录</p>
        <br />
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="pwdType"
            prefix-icon=" el-icon-lock"
            @keyup.enter.native="login"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;"
            @click.enter.native.prevent="login('loginForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      pwdType: "password" //用来判断显示密码还是文本
    };
  },
  methods: {
    //让密码可见或不可见
    showPwd() {
      if (this.loginForm.password != "") {
        this.pwdType === "password"
          ? (this.pwdType = "")
          : (this.pwdType = "password");
        let e = document.getElementsByClassName("el-icon-view")[0];
        this.pwdType == ""
          ? e.setAttribute("style", "color: #409EFF")
          : e.setAttribute("style", "color: #c0c4cc");
      }
    },
    //登录按钮
    login(formName) {
      //将用户名存起来
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          httpService.request(api.login, params, "post").then(res => {
            const data = httpService.parseResp(res);
            if(data.success){
              this.$message({
                          type: "success",
                          message: "登录成功"
                        });
                localStorage.setItem('username',data.data.realname);
                this.$router.push({
                  name: "dataplatform"
                });
            }else{
               if(data.msg == "用户名不存在"){
                 this.$message.error('用户不存在,请重新登录 ！');
                 this.loginForm.username = "";
                 this.loginForm.password = "";
               }
              }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2D3A4B;
  /* background: url("../../assets/1.jpg") no-repeat center; */
}
.login-wraper {
  width: 50%;
  margin: 0 auto;
  margin-top: 10%;
}
.login-form {
  width: 40%;
  padding: 20px;
  /* background: rgba(225, 225, 225,1); */
  background: white;
  margin: 0 auto;
  border-radius: 10px;
}
</style>