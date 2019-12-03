<template>
  <div class="task-add">
    <div class="content-wrpper">
      <!-- 是否可用 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="file">
        <!-- 组件名称 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">任务名称</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="TaskName">
              <el-input v-model="ruleForm.TaskName" placeholder="请正确输入任务名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">任务描述</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="TaskDescrib">
              <el-input type="textarea" :rows="4" v-model="ruleForm.TaskDescrib" placeholder="请正确输入任务描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">负责人</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="principal">
              <el-input v-model="ruleForm.principal" placeholder="请正确输入负责人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <br />
        <br />
        <br />
        <br />
        <el-row>
          <el-col :span="2" :offset="10">
            <el-button
               type="primary"
             plain
              size="mini"
            class="btn"
              @click="addBtn('ruleForm')"
            >{{BtnContent}}</el-button>
          </el-col>
        </el-row>
        <!-- log弹窗 -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "taskAdd",
  data() {
    return {
      ruleForm: {
        TaskName: "", //任务名称
        TaskDescrib: "", //任务描述
        principal: "", //负责人
      },
      rules: {
        TaskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        TaskDescrib: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        principal: [
          { required: true, message: "请输入负责人", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      BtnContent: "新增" //定义按钮的新增内容
    };
  },
   mounted: function() {
     if (this.$route.params.setId == undefined) {
       this.BtnContent = "新增";
    }else{
       this.BtnContent = "保存";
    }
  },
   created() {
     if(this.$route.params.setId != undefined){
       httpService.request(api.taskToFet, {id:this.$route.params.setId}, "post").then(res => {
       const data = httpService.parseResp(res);
       console.log(data.data);
       if (data.success) {
          this.ruleForm.TaskName = data.data.tiName;
          this.ruleForm.TaskDescrib = data.data.tiContent;
          this.ruleForm.principal = data.data.tiPerson;
       }
     });

     }
   },
  methods: {
    //logstash弹框中的关闭按钮进行关闭
    //请求数据成功后清空输入框
    empty() {
      this.ruleForm.TaskDescrib = "";
      this.ruleForm.TaskName = "";
      this.ruleForm.principal = "";
    },
    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    addBtn(formName) {
      if (this.BtnContent == "新增") {
        const paramss = {
          content: this.ruleForm.TaskDescrib,
          name: this.ruleForm.TaskName,
          person: this.ruleForm.principal
        };
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                httpService.request(api.taskAdd, paramss, "post").then(res => {
                  const data = httpService.parseResp(res);
                  console.log(res)
                  if (data.success) {
                    //返回一览页,并将路由里面的参数
                    this.$message({
                      type: "success",
                      message: "新增成功"
                    });
                    console.log(res);
                    this.empty();
                  } else {
                    this.$message({
                      type: "info",
                      message: "新增失败"
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "新增失败"
                });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }else{
        const paramsed = {
          content: this.ruleForm.TaskDescrib,
          name: this.ruleForm.TaskName,
          id:this.$route.params.setId,
          person: this.ruleForm.principal
        };
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否保存?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                httpService.request(api.taskUpdate, paramsed, "post").then(res => {
                  const data = httpService.parseResp(res);
                  console.log(res);
                  if (data.success) {
                    //返回一览页,并将路由里面的参数
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                     this.$route.params.setId = "";
                      this.$router.push({
                      path: "/taskList",
                      query: {setId:""}
                      });
                  } else {
                    this.$message({
                      type: "info",
                      message: "保存失败"
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "保存失败"
                });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.task-add {
  width: 100%;
  overflow: hidden;
}
.content-wrpper {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  overflow-y: auto;
}
.com {
  width: 201px;
  height: 38px;
  border: 1px solid #a9a9a9;
  text-align: center;
  line-height: 38px;
  border-radius: 5px;
  display: block;
}
.coms {
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  display: block;
  margin-left: 37px;
  background: #a9a9a9;
}
.get {
  border: 0;
  outline: none;
  width: 90px;
  height: 30px;
  color: white;
  cursor: pointer;
  background: #a6a9ad;
  border-radius: 15px;
  margin-left: 10px;
  line-height: 9px;
  margin-top: 5px;
}
.put {
  float: right;
  margin: 15px 10px 0 0;
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
</style>