<template>
  <div class="logstash">
    <div class="log-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log">
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="coms">组件名称</span>
          </el-col>
          <el-col :span="20.5">
            <span class="coms">Logstash</span>
          </el-col>
        </el-row>

        <el-row type="flex" v-show="logInstance">
          <el-col :span="3.5">
            <span class="com">实例名称</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item prop="taskName">
              <el-input v-model="ruleForm.taskName" placeholder="请正确输入任务名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 、、、、、、、、、 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">任务名称</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.taskNameSelects" @change="tasks">
                <el-option
                  :label="item.tiName"
                  :value="item.id"
                  v-for="item in taskNameDatas"
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
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.subTaskNameSelects" :disabled="isDisableds">
                <el-option
                  :label="item.tsiName"
                  :value="item.id"
                  v-for="item in subTaskNameDatas"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 。。。。。。。。。。 -->
        <!-- 输入配置 -->
        <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">组件选择</p>
          </el-col>
        </el-row>
         <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">Logstash 地址</span>
          </el-col>
          <el-col :span="7.5">
            <el-form-item prop="address">
              <el-input v-model="ruleForm.LogAddress" placeholder="请正确输入需要的地址" :disabled="isDis"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <button @click.prevent="GetLogstash" class="moreBtn">获取</button>
            <!-- <el-button type="primary" plain class="get" @click="GetLog">获取</el-button> -->
          </el-col>
        </el-row>
       <el-dialog title="Logstash 组件配置一览" :visible.sync="editFormVisibleLOG">
          <div>
            <el-table
              :data="tableDatalog"
              border
              style="width: 100%"
              :cell-style="rowstyle"
              :header-cell-style="headStyle"
            >
              <!-- ALL -->
              <el-table-column label>
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="templateRadios"
                    @change.native="getTemplateRows(scope.$index,scope.row)"
                  >&nbsp</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="platformName" label="平台名称"></el-table-column>
              <el-table-column prop="clHost" label="地址"></el-table-column>
            </el-table>
            <el-row>
              <el-col :span="1.5" class="put">
                <el-button type="danger" size="mini" @click.prevent="closesss">关闭</el-button>
              </el-col>
              <el-col :span="2" class="put">
                <el-button type="primary" size="mini" @click.prevent="sels">选择</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>


          <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">输入配置</p>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            <el-form-item style="margin-left:0px;width:203px ">
              <el-select v-model="ruleForm.inputmodelSelect">
                <el-option label="beats" value="beats"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- //端口 -->

        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">端口</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="port" style="width:223px">
              <el-input v-model="ruleForm.port" placeholder="5046"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ssl -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">SSL</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.ssl">
                <el-option label="false" value="false"></el-option>
                <el-option label="true" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 字段添加 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">字段添加</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="addFiled">
              <el-input v-model="ruleForm.addFiled" placeholder="{'sysno' => '%{[fields][sysno]}'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 过滤配置 -->
        <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">过滤配置</p>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">过滤内容</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="filterInputContent">
              <el-input type="textarea" :rows="6" v-model="ruleForm.filterInputContent" placeholder="if [sysno] == 'TYZF' or [sysno] == 'ZHLC' {
           grok {
                   match => {
                           message => '%{DATA:time}\s*\[(?<level>([a-zA-Z]*))\]\s*(?<info>([\s\S]*))'
                   }
           }
           date {  
                   match => [ 'time', 'yyyy-MM-dd HH:mm:ss.SSS','yyyy-MM-dd HH:mm:ss,SSS']  
           } 
}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 字段转换 -->
        <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">字段转换</p>
          </el-col>
        </el-row>
        <!-- 字段替换 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">字段替换</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="fieldTransform">
              <el-input v-model="ruleForm.fieldTransform" placeholder="{ 'host' => '%{[fields][ip]}' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 字段移除 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">字段移除</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="fieldDelet">
              <el-input v-model="ruleForm.fieldDelet" placeholder="['tags','offset','prospector','beat','fields','@version','info','time','num]'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 输出配置 -->
        <el-row type="flex">
          <el-col :span="3">
            <p class="input-config ss">输出配置</p>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            <el-form-item style="margin-left:0px;width:203px ">
              <el-select v-model="ruleForm.outputmodelSelect">
                <el-option label="kafka" value="kafka"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 是否响应 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">是否响应</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.isResponse">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="all" value="all"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- kafka地址 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">Kafka 地址</span>
          </el-col>
          <el-col :span="7.5">
            <el-form-item prop="address">
              <el-input v-model="ruleForm.address" placeholder="请正确输入需要的地址" :disabled="isDis"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <button @click.prevent="GetLog" class="moreBtn">获取</button>
            <!-- <el-button type="primary" plain class="get" @click="GetLog">获取</el-button> -->
          </el-col>
        </el-row>
        <!-- logstash弹框 -->
        <el-dialog title="Kafka 组件配置一览" :visible.sync="editFormVisibleKa">
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :cell-style="rowstyle"
              :header-cell-style="headStyle"
            >
              <!-- ALL -->
              <el-table-column label>
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="templateRadio"
                    @change.native="getTemplateRow(scope.$index,scope.row)"
                  >&nbsp</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="platformName" label="平台名称"></el-table-column>
              <el-table-column prop="ckHost" label="地址"></el-table-column>
            </el-table>
            <el-row>
              <el-col :span="1.5" class="put">
                <el-button type="danger" size="mini" @click="close">关闭</el-button>
              </el-col>
              <el-col :span="2" class="put">
                <el-button type="primary" size="mini" @click.prevent="sel">选择</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
        <!-- kafka主题 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">Kafka 主题</span>
          </el-col>
          <el-col :span="7.5">
            <el-form-item prop="theme">
              <el-input v-model="ruleForm.theme" placeholder="请正确输入需要的主题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 数据格式 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">数据格式</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.dataFormate">
                <el-option label="json" value="json"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 最大字节 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">最大字节</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="maxChar" style="width:223px">
              <el-input v-model="ruleForm.maxChar" placeholder="41943040"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 重试次数 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">重试次数</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="repeatNum" style="width:223px">
              <el-input v-model="ruleForm.repeatNum" placeholder="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 重试间隔 -->
        <el-row type="flex">
          <el-col :span="3.5">
            <span class="com">重试间隔</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="repeatReaval" style="width:223px">
              <el-input v-model="ruleForm.repeatReaval" placeholder="2000"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 新增按钮 -->
        <div class="new-incre">
          <el-button
            type="primary"
            plain
            class="btn"
            style="margin-left:10px"
            @click.native.prevent="previewLof('ruleForm')"
          >预览</el-button>
          <el-button
            type="primary"
            plain
            class="btn"
            @click.native.prevent="newIncreated('ruleForm')"
          >{{btnContent}}</el-button>
        </div>
        <el-dialog title="Logstash 配置预览" :visible.sync="previewslog" width="60%">
          <div style="text-align:left">
            <pre v-highlight>
<code class="yml">
{{previewDataLog}}
</code>
</pre>
 <el-row>
              <el-col :span="1.5" class="put">
                <el-button type="primary" size="mini" @click.prevent="toClosedLog">关闭</el-button>
              </el-col>
              <el-col :span="2" class="put">
                <el-button type="danger" size="mini" @click.prevent="toDownLoadLog">下载</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "logstash",
  data() {
    return {
      ruleForm: {
        subTaskNameSelects: "",
        taskNameSelects: "",
        componentSelect: "logstash", //组件选择
        taskName: "test", //实例名称
        inputmodelSelect: "beats", //输入配置类型选择
        port: "", //端口
        ssl: "false", //ssl
        addFiled: "", //字段添加
        filterInputContent: "", //过滤内容
        fieldTransform: "", //字段替换
        fieldDelet: "", //字段移除
        outputmodelSelect: "kafka", //输出配置类型
        isResponse: "0", //是否响应
        address: "", //kafka地址
        theme: "", //kafka主题
        dataFormate: "json", //数据格式
        maxChar: "", //最大字节
        repeatNum: "", //重复次数
        repeatReaval: "", //重复间隔
        LogAddress:"",//logstash地址获取
      },
      rules: {
        port: [
          { required: true, message: "请输入端口号", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
  
          address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
         theme: [
          { required: true, message: "请输入主题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
      },
      btnContent: "新增",
      previewDataLog: "", //要预览的数据
      previewslog: false, //预览弹框
      logInstance: false, //实例名称暂时隐藏但是还是有值的
      editFormVisibleKa: false,
      editFormVisibleLOG:false,
      isDisableds: true,
      subTaskNameDatas: [],
      taskNameDatas: [],
      templatData: [], //临时储存的数据
      templatDatalog:[],//logstash临时数组
      isDis: true,
      templateRadio: "", //记录单选lable
      templateRadios:"",//logstash单选
      tableData: [], //这是对kafka地址的弹框数据
      tableDatalog:[],//logstash地址的弹框数据
      clId:""
    };
  },
  //获得需要修改的数据
  created() {
    if (this.$route.params.setId != undefined) {
      const getparams1 = {
        id: this.$route.params.setId
      };
      console.log(this.$route.params.tiId);
      httpService
        .request(api.taskGetAllSub, { tiId: this.$route.params.tiId }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          if (data.success) {
            this.subTaskNameDatas = data.data;
          }
        });
      //获取需要修改的数据
      httpService.request(api.logstashGet, getparams1, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data.clId);
         httpService
        .request(api.getLogstash, { id: data.data.clId }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          if (data.success) {
             console.log(data.data.clHost);
             this.ruleForm.LogAddress = data.data.clHost;
          }
        });
        console.log("要修改的数据");
        if (data.success) {
          this.ruleForm.taskName = data.data.lName;
          this.ruleForm.port = data.data.lIBeatsPort;
          this.ruleForm.filterInputContent = data.data.lFContent;
          this.ruleForm.fieldDelet = data.data.lFMutateRemoveField;
          this.ruleForm.fieldTransform = data.data.lFMutateReplace;
          this.ruleForm.addFiled = data.data.lIBeatsAddField;
          this.ruleForm.address = data.data.lOKafkaBootstrapServers;
          this.ruleForm.theme = data.data.lOKafkaTopicId;
          this.ruleForm.maxChar = data.data.lOKafkaMaxRequestSize;
          this.ruleForm.repeatNum = data.data.lOKafkaRetries;
          this.ruleForm.repeatReaval = data.data.lOKafkaRetryBackoffMs;
          this.ruleForm.ssl = data.data.lIBeatsSsl;
          this.ruleForm.taskNameSelects = data.data.tiId;
          this.ruleForm.subTaskNameSelects = data.data.tsiId;
          this.ruleForm.isResponse = data.data.lOKafkaAcks;
          this.ruleForm.dataFormate = data.data.lOKafkaCodec;
        }
      });
    }
    let formData = new FormData();
    formData.set("pageNo", 1);
    formData.set("pageSize", 5);
    //表格初始化数据,filebeat
    httpService.request(api.taskGetAll, formData, "post").then(res => {
      const data = httpService.parseResp(res);
      if (data.success) {
        this.taskNameDatas = data.data;
      }
    });
  },
  mounted: function() {
    //对需要修改页面的样式进行控制
    if (this.$route.params.compType == "Logstash") {
      this.btnContent = "保存";
    }
  },
  methods: {
    //logstash地址获取
    GetLogstash(){
      this.editFormVisibleLOG = true;
         let formData = new FormData();
       formData.set("pageNo", 1);
       formData.set("pageSize", 5);
       httpService.request(api.getLogstashall, formData, "post").then(res => {
         const data = httpService.parseResp(res);
         console.log(data.data.list);
         this.tableDatalog = data.data.list;
       });
    },
    //单选
     getTemplateRows(index, row) {
      this.clId = row.id;
      // console.log(this.templateRadios);
      this.templatDatalog[0] = row.clHost;
      console.log(row);
    },
    //logstash地址弹框的关闭
    closesss(){
      this.editFormVisibleLOG = false;
    },
    //点击logstash弹框里的选择
    sels() {
      this.ruleForm.LogAddress = this.templatDatalog[0];
      //选择后关闭
      this.editFormVisibleLOG = false;
      this.templateRadios = "";
    },
    //预览关闭
    toClosedLog(){
            this.previewslog = false;

    },
    //预览下载
    toDownLoadLog(){
         const logParas = {
            name: this.ruleForm.taskName, //任务名称
            iType: this.ruleForm.inputmodelSelect, //输入配置类型
            iBeatsPort: this.ruleForm.port, //端口
            iBeatsSsl: this.ruleForm.ssl, //ssl
            iBeatsAddField: this.ruleForm.addFiled, //字段添加
            fContent: this.ruleForm.filterInputContent, //过滤内容
            fMutateReplace: this.ruleForm.fieldTransform, //字段替换
            fMutateRemoveField: this.ruleForm.fieldDelet, //字段移除
            oType: this.ruleForm.outputmodelSelect, //输出类型
            oKafkaAcks: this.ruleForm.isResponse, //是否响应
            tiId: this.ruleForm.taskNameSelects,
            tsiId: this.ruleForm.subTaskNameSelects,
            oKafkaBootstrapServers: this.ruleForm.address, //kafka地址
            oKafkaTopicId: this.ruleForm.theme, //主题
            oKafkaCodec: this.ruleForm.dataFormate, //数据格式
            oKafkaMaxRequestSize: parseInt(this.ruleForm.maxChar), //最大字节数
            oKafkaRetries: parseInt(this.ruleForm.repeatNum), //重试次数
            oKafkaRetryBackoffMs: parseInt(this.ruleForm.repeatReaval) //重试间隔
          };
          httpService.request(api.previewLog, logParas, "post").then(res => {
            const data = httpService.parseResp(res);
            console.log(res.data);
               var blob = new Blob([res.data], {
              type: "application/actet-stream;charset=utf-8"
            });
            var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            var filename = contentDisposition.slice(22, 35);
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.style.display = "none";
            downloadElement.href = href;
  
            downloadElement.download = filename; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象   
          });
    },
    //预览接口
    previewLof(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const logPara = {
            name: this.ruleForm.taskName, //任务名称
            iType: this.ruleForm.inputmodelSelect, //输入配置类型
            iBeatsPort: this.ruleForm.port, //端口
            iBeatsSsl: this.ruleForm.ssl, //ssl
            iBeatsAddField: this.ruleForm.addFiled, //字段添加
            fContent: this.ruleForm.filterInputContent, //过滤内容
            fMutateReplace: this.ruleForm.fieldTransform, //字段替换
            fMutateRemoveField: this.ruleForm.fieldDelet, //字段移除
            oType: this.ruleForm.outputmodelSelect, //输出类型
            oKafkaAcks: this.ruleForm.isResponse, //是否响应
            tiId: this.ruleForm.taskNameSelects,
            tsiId: this.ruleForm.subTaskNameSelects,
            oKafkaBootstrapServers: this.ruleForm.address, //kafka地址
            oKafkaTopicId: this.ruleForm.theme, //主题
            oKafkaCodec: this.ruleForm.dataFormate, //数据格式
            oKafkaMaxRequestSize: parseInt(this.ruleForm.maxChar), //最大字节数
            oKafkaRetries: parseInt(this.ruleForm.repeatNum), //重试次数
            oKafkaRetryBackoffMs: parseInt(this.ruleForm.repeatReaval) //重试间隔
          };
          httpService.request(api.previewLog, logPara, "post").then(res => {
            const data = httpService.parseResp(res);
            console.log(res.data);
            this.previewDataLog = res.data;
            this.previewslog = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击任务选择子任务
    tasks(val) {
      console.log(val);
      this.ruleForm.subTaskNameSelects = "";
      httpService
        .request(api.taskGetAllSub, { tiId: val }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          console.log(data);
          if (data.success) {
            this.subTaskNameDatas = data.data;
            this.isDisableds = false;
          }
        });
    },
    //lkafka地址单选按钮的时间
    getTemplateRow(index, row) {
      this.templateRadio = row.id;
      this.templatData[0] = row.ckHost;
      this.templatData[1] = row.ckTopic;
      console.log(row);
    },
    //关闭kafka弹框
    close() {
      this.editFormVisibleKa = false;
    },
    //点击选择按钮进行填充输入框
    sel() {
      this.ruleForm.address = this.templatData[0];
      //选择后关闭
      this.editFormVisibleKa = false;
      this.templateRadio = "";
    },
    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    //kafka地址弹框
    GetLog() {
      this.editFormVisibleKa = true;
      let formData = new FormData();
      formData.set("pageNo", 1);
      formData.set("pageSize", 5);
      httpService.request(api.getKafkaall, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data.list);
        this.tableData = data.data.list;
      });
    },
    // // 发送请求后置空数据
    empty() {
      this.ruleForm.taskName = ""; //任务名称
      this.ruleForm.address = ""; //kafka地址
      this.ruleForm.theme = ""; //主题
      this.ruleForm.maxChar = ""; //最大字节数
      this.ruleForm.repeatReaval = ""; //重试间隔
      this.ruleForm.repeatNum = ""; //重试次数
      this.ruleForm.filterInputContent = ""; //过滤内容
      this.ruleForm.fieldDelet = ""; //字段移除
      this.ruleForm.addFiled = ""; //字段添加
      this.ruleForm.LogAddress= "";
      this.ruleForm.fieldTransform = ""; //字段替换
      this.ruleForm.port = ""; //字段替换
      this.ruleForm.taskNameSelects = "";
      this.ruleForm.subTaskNameSelects = "";
    },

    //新增事件，发送请求i
    newIncreated(formName) {
      //请求参数
      console.log(this.templateRadios);
      const logParams = {
        name: this.ruleForm.taskName, //任务名称
        iType: this.ruleForm.inputmodelSelect, //输入配置类型
        iBeatsPort: this.ruleForm.port, //端口
        iBeatsSsl: this.ruleForm.ssl, //ssl
        iBeatsAddField: this.ruleForm.addFiled, //字段添加
        fContent: this.ruleForm.filterInputContent, //过滤内容
        fMutateReplace: this.ruleForm.fieldTransform, //字段替换
        fMutateRemoveField: this.ruleForm.fieldDelet, //字段移除
        oType: this.ruleForm.outputmodelSelect, //输出类型
        oKafkaAcks: this.ruleForm.isResponse, //是否响应
        tiId: this.ruleForm.taskNameSelects,
        tsiId: this.ruleForm.subTaskNameSelects,
        clId:this.clId,
        oKafkaBootstrapServers: this.ruleForm.address, //kafka地址
        oKafkaTopicId: this.ruleForm.theme, //主题
        oKafkaCodec: this.ruleForm.dataFormate, //数据格式
        oKafkaMaxRequestSize: parseInt(this.ruleForm.maxChar), //最大字节数
        oKafkaRetries: parseInt(this.ruleForm.repeatNum), //重试次数
        oKafkaRetryBackoffMs: parseInt(this.ruleForm.repeatReaval) //重试间隔
      };
      console.log(logParams);
      if (this.btnContent == "新增") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
                // 发送请求
                httpService
                  .request(api.LogstashAdd, logParams, "post")
                  .then(res => {
                    const data = httpService.parseResp(res);
                    console.log(data);
                    if (data.success) {
                      this.empty();
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
        this.$confirm("是否修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            logParams.id = this.$route.params.setId;
            console.log(logParams);
            // 发送请求
            httpService
              .request(api.logstashUndate, logParams, "post")
              .then(res => {
                const data = httpService.parseResp(res);
                console.log(data);
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  this.$router.push({
                    path: "fileBeatList"
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
      }
    }
  }
};
</script>
<style scoped>
.logstash {
  width: 100%;
  height: 100%;
}
.log-content {
  width: 80%;
  margin: 0 auto;
}

.input-config {
  margin-top: 15px;
  background: #f2f2f2;
  width: 203px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.new-incre {
  width: 826px;
  height: 30px;
  margin: 15px 0;
  overflow: hidden;
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
#btnPlus {
  display: inline-block;
  width: 30px;
  height: 34px;
}
.sl {
  width: 246px;
}
.get {
  border: 0;
  outline: none;
  width: 90px;
  height: 37px;
  color: white;
  cursor: pointer;
  background: #a6a9ad;
  border-radius: 15px;
  margin-left: 16px;
  line-height: 9px;
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

.el-form-item {
  width: 470px;
  margin-left: 30px;
}
.ss {
  margin-bottom: 30px;
}
.coms {
  width: 201px;
  height: 40px;
  border: 1px solid #a9a9a9;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  margin-right: 30px;
  margin-bottom: 15px;
  display: block;
}
.log {
  margin-top: 40px;
}
.put {
  margin: 10px 0 5px 0;
  float: right;
}
.moreBtn {
  float: right;
  width: 65px;
  height: 26px;
  outline: none;
  border: 0;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
  color: white;
  background: #a6a9ad;
}
.moreBtn:hover {
  background: #409eff;
}
</style>