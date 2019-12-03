<template>
  <div class="connect-config">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="file">
      <el-row>
        <el-col :span="3.5">
          <span class="com">连接名称</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item prop="connectName" style="width:223px">
            <el-input v-model="ruleForm.connectName" placeholder="请输入连接名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3.5">
          <span class="com">连接协议</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item>
            <el-select v-model="ruleForm.protocol">
              <el-option label="SSH" value="SSH"></el-option>
              <el-option label="SFTP" value="SFTP"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3.5">
          <span class="com">地址</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item prop="ip" style="width:223px">
            <el-input v-model="ruleForm.ip" placeholder="请正确输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3.5">
          <span class="com">端口</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item prop="port" style="width:223px">
            <el-input v-model="ruleForm.port" placeholder="请正确输入端口"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3.5">
          <span class="com">用户名</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item prop="Username" style="width:223px">
            <el-input v-model="ruleForm.Username" placeholder="请正确输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3.5">
          <span class="com">密码</span>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item prop="password" style="width:223px">
            <el-input type="password" v-model="ruleForm.password" placeholder="请正确输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <br />
      <br />
      <div class="new-incre">
        <el-button
          type="primary"
          plain
          class="btn"
          @click.native.prevent="newIncreats('ruleForm')"
        >{{btnContent}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "connectConfig",
  data() {
    return {
      ruleForm: {
        connectName: "", //谅连接名称
        protocol: "", //连接协议
        port: "", //端口
        ip: "", //地址
        Username: "", //用户名
        password: "" //密码
      },
      rules: {
        connectName: [
          { required: true, message: "请正确输入连接名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        port: [
          { required: true, message: "请正确输入端口", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请正确输入地址", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        Username: [
          { required: true, message: "请正确输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请正确输入端口", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      btnContent: "新增"
    };
  },
  methods: {
    //清空
    empty() {
      this.ruleForm.ip = "";
      this.ruleForm.connectName = "";
      this.ruleForm.password = "";
      this.ruleForm.port = "";
      this.ruleForm.protocol = "";
      this.ruleForm.Username = "";
    },
    //新增
    newIncreats(formName) {
      if (this.btnContent == "新增") {
        const paramsd = {
          ip: this.ruleForm.ip, //地址
          loginUserName: localStorage.getItem("username"),
          name: this.ruleForm.connectName, //连接名称
          password: this.ruleForm.password, //密码
          port: this.ruleForm.port, //端口
          protocol: this.ruleForm.protocol,
          user: this.ruleForm.Username
        };
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              //点击确定后发送新增请求
              httpService.request(api.remoteAdd, paramsd, "post").then(res => {
                const data = httpService.parseResp(res);
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "新增成功"
                  });
                  this.empty();
                }
              });
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否保存?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              const paramsds = {
                ip: this.ruleForm.ip, //地址
                loginUserName: localStorage.getItem("username"),
                name: this.ruleForm.connectName, //连接名称
                password: this.ruleForm.password, //密码
                port: this.ruleForm.port, //端口
                protocol: this.ruleForm.protocol,
                user: this.ruleForm.Username
              };
              //点击确定后发送新增请求
              httpService.request(api.remoteAdd, paramsds, "post").then(res => {
                const data = httpService.parseResp(res);
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  this.$router.push({
                    name: "connectList",
                    params: { setId: "" } //将需要修改行的id和组件类型传到新增数据页
                  });
                }
              });
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  },
  created() {
    //将需要修改的数据进行渲染
    if (this.$route.params.setId != undefined) {
      this.btnContent = "保存";
      const getparamsd = {
        id: this.$route.params.setId
      };
      httpService.request(api.remoteGet, getparamsd, "post").then(res => {
        const data = httpService.parseResp(res);
        if (data.success) {
          console.log(data.data);
          (this.ruleForm.ip = data.data.riIp), //地址
            (this.ruleForm.connectName = data.data.riName), //连接名称
            (this.ruleForm.password = data.data.riIp), //密码
            (this.ruleForm.port = data.data.riPort), //端口
            (this.ruleForm.protocol = data.data.riProtocol),
            (this.ruleForm.Username = data.data.riUser);
        }
      });
    }
  }
};
</script>

<style scoped>
.connect-config {
  width: 100%;
}
.file {
  width: 50%;
  margin: 0 auto;
  margin-top: 60px;
}
.com {
  width: 201px;
  height: 40px;
  border: 1px solid #a9a9a9;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  display: block;
}

.btn {
  background: #a6a9ad;
  color: white;
  float: right;
  line-height: 9px;
  width: 90px;
  height: 30px;
  cursor: pointer;
  border-radius: 15px;
  border: 0;
}
.new-incre {
  width: 474px;
  height: 30px;
  margin: 15px 0 30px 0;
  overflow: hidden;
}
</style>