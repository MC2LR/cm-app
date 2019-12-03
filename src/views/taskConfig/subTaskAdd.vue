<template>
  <div class="sub-task-add">
    <div class="subWraper">
      <br />
      <br />
      <el-form :model="ruleFormd" :rules="rules" ref="ruleForm" class="file">
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">任务名称</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item>
              <el-select v-model="ruleFormd.taskName">
                <el-option
                  :label="item.tiName"
                  :value="item.id"
                  v-for="item in this.outDatas"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">子任务名称</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="subTaskName">
              <el-input v-model="ruleFormd.subTaskName" placeholder="请正确输入子任务名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">子任务描述</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="subTaskDe">
              <el-input type="textarea" :rows="4" v-model="ruleFormd.subTaskDe" placeholder="请正确输入子任务描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">负责人</span>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="personOne">
              <el-input v-model="ruleFormd.personOne" placeholder="请正确输入负责人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="10">
            <el-button
              type="primary"
              plain
              size="mini"
              class="btn"
              @click="suBtn('ruleForm')"
            >{{BtnContents}}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "subTaskAdd",
  data() {
    return {
      ruleFormd: {
        taskName: "", //任务名称
        subTaskDe: "", //子任务描述
        subTaskName: "", //子任务名称
        personOne: "" //负责人
      },
      rules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        subTaskName: [
          { required: true, message: "请输入子任务名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        subTaskDe: [
          { required: true, message: "请输入子任务描述", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        personOne: [
          { required: true, message: "请输入负责人", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      BtnContents: "新增",
      outDatas: [] //下拉框的数据
    };
  },
  created() {
    if (this.$route.params.setId != undefined) {
      httpService
        .request(api.taskGetSubs, { id: this.$route.params.setId }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          console.log(data.data);
          console.log("ddddd");
          if (data.success) {
            this.ruleFormd.taskName = data.data.tiId;
            this.ruleFormd.subTaskDe = data.data.tsiContent;
            this.ruleFormd.subTaskName = data.data.tsiContent;
            this.ruleFormd.personOne = data.data.tsiPerson;
          }
        });
    }
      let formData = new FormData();
      formData.set("pageNo", 1);
      formData.set("pageSize", 5);
      //表格初始化数据,filebeat
      httpService.request(api.taskGetAll, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data);
        this.outDatas = data.data;
      });
  },
  mounted: function() {
    if (this.$route.params.setId == undefined) {
      this.BtnContents = "新增";
    } else {
      this.BtnContents = "保存";
    }
  },
  methods: {
    empty() {
      this.ruleFormd.subTaskDe = "";
      this.ruleFormd.taskName = "";
      this.ruleFormd.personOne = "";
      this.ruleFormd.subTaskName = "";
    },
    suBtn(formName) {
      if (this.BtnContents == "新增") {
        const paramsdd = {
          content: this.ruleFormd.subTaskDe,
          name: this.ruleFormd.subTaskName,
          person: this.ruleFormd.personOne,
          tiId: this.ruleFormd.taskName
        };
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                httpService
                  .request(api.subtaskadd, paramsdd, "post")
                  .then(res => {
                    const data = httpService.parseResp(res);
                    console.log(res);
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
      } else {
        const paramsed = {
          content: this.ruleFormd.subTaskDe,
          name: this.ruleFormd.subTaskName,
          tiId: this.ruleFormd.taskName,
          id: this.$route.params.setId,
          person: this.ruleFormd.personOne
        };
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否保存?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                httpService
                  .request(api.updateSub, paramsed, "post")
                  .then(res => {
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
                        path: "/subTaskList",
                        query: { setId: "" }
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
.sub-task-add {
  width: 100%;
  overflow: hidden;
}
.subWraper {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  overflow-y: auto;
}
.subTitle {
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #f2f2f2;
  border-radius: 5px;
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
</style>