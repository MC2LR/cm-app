 <template>
  <div class="comp-config">
    <div class="comp-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log">
        <!-- 输入配置 -->
        <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">Kafka 连接配置</p>
          </el-col>
        </el-row>
        <!-- 平台列表 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="coms">平台列表</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.platformListLog">
                <el-option
                  :label="item.piName"
                  :value="item.id"
                  v-for="item in outData"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 连接地址 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="coms">连接地址</span>
          </el-col>
          <el-col>
            <el-form-item prop="ToAdress" style="width:300px">
              <el-input v-model="ruleForm.ToAdress" placeholder="请正确输入连接地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 新增按钮 -->
        <div class="new-incre">
          <el-button type="primary" plain class="btn" @click="kafkaBtn('ruleForm')">{{btnContent}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "compConfig",
  data() {
    return {
      ruleForm: {
        platformListLog: "", //平台列表
        ToAdress: "" //连接地址
      },
      btnContent: "新增",
      outData: [],
      rules: {
        ToAdress: [
          { required: true, message: "请输入连接地址", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    //对需要修改页面的样式进行控制
    if (this.$route.params.compType == "Kafka") {
      this.btnContent = "保存";
    }
  },
  created() {

    //获取平台列表的数据
    const param = {
      isPaged: false
    };
    httpService.request(api.platformtgetAll, param, "post").then(res => {
      const data = httpService.parseResp(res);
      //console.log(data);
      if (data.success) {
       // console.log(data.data);
        this.outData = data.data;
       // console.log(this.outData);
      }
    });

   //获取需要修改的数据
    if (this.$route.params.setId != undefined) {
      httpService
        .request(
          api.getKafka,
          {
            id:this.$route.params.setId
          },
          "post"
        )
        .then(res => {
          const data = httpService.parseResp(res);
          //console.log(data);
          if (data.success) {
            console.log(data);
            console.log("dd");
            this.ruleForm.ToAdress = data.data.ckHost;
            this.ruleForm.platformListLog = data.data.platformId;
          }
        });
    }




  },
  methods: {
    empty() {
      (this.ruleForm.ToAdress = ""),
        (this.ruleForm.platformListLog = "");
    },
    //新增按钮i
    kafkaBtn(formName) {
      if (this.btnContent == "新增") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //发送请求
            const param = {
              host: this.ruleForm.ToAdress,
              platformId: this.ruleForm.platformListLog // 将对应的id传过去
            };

            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                //点击确定后发送新增请求
                httpService
                  .request(api.conmmonKafkahConfig, param, "post")
                  .then(res => {
                    const data = httpService.parseResp(res);
                    console.log(res);
                    if (data.success) {
                      this.empty();
                      this.$message({
                        type: "success",
                        message: "新增成功"
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
        // 这是修改的请求

        this.$refs[formName].validate(valid => {
          if (valid) {
            //发送请求
            this.$confirm("是否修改?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {

            const param = {
              host:this.ruleForm.ToAdress,
              id:this.$route.params.setId,
              platformId:this.ruleForm.platformListLog,
            };
                //点击确定后发送新增请求
                httpService
                  .request(api.componentUpdateKafka, param, "post")
                  .then(res => {
                    const data = httpService.parseResp(res);
                    if (data.success) {
                      this.$message({
                        type: "success",
                        message: "修改成功"
                      });
                    this.$router.push({
                      path: "configList",
                      query: { setId: "" }
                    });
                    } else {
                      this.$message({
                        type: "info",
                        message: "修改失败"
                      });
                    }
                  });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "修改失败"
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
.comp-config {
  width: 100%;
  margin-bottom: 80px;
}
.comp-content {
  width: 60%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10%;
  border: 1px solid #f2f2f2;
  padding-left: 50px;
}

.input-config {
  margin-top: 15px;
  background: #f2f2f2;
  width: 203px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.ss {
  margin-bottom: 30px;
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
  width: 570px;
  height: 30px;
  margin: 15px 0;
  overflow: hidden;
}

.coms {
  width: 201px;
  height: 37px;
  border: 1px solid #a9a9a9;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  margin-right: 30px;
  margin-bottom: 15px;
  display: block;
}
</style>