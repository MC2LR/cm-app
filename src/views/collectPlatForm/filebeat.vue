<template>
  <div class="file-beat">
    <!-- fileBead组件部分 -->
    <div class="file-beat-content">
      <!-- 组件选择 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="file">
        <!-- 组件名称 -->
        <el-row>
          <el-col :span="3.5">
            <span class="coms">组件名称</span>
          </el-col>
          <el-col :span="20.5">
            <span class="coms">Filebeat</span>
          </el-col>
        </el-row>

        <!-- 任务名称 -->
        <el-row v-show="instanceIf">
          <el-col :span="3.5">
            <span class="com">实例名称</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item prop="taskName">
              <el-input v-model="ruleForm.taskName" placeholder="请正确输入实例名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3.5">
            <span class="com">任务名称</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.taskNameSelect" @change="task">
                <el-option
                  :label="item.tiName"
                  :value="item.id"
                  v-for="item in taskNameData"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3.5">
            <span class="com">子任务名称</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.subTaskNameSelect" :disabled="isDisabled">
                <el-option
                  :label="item.tsiName"
                  :value="item.id"
                  v-for="item in subTaskNameData"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 输入配置 -->
        <el-row>
          <el-col :span="24">
            <p class="input-config ss">输入配置</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3.5">
            <span class="com">文件的输入类型</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.inputStyle">
                <el-option label="log" value="log"></el-option>
                <el-option label="true" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 是否可用 -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">是否可用</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.enabled" placeholder="请选择是否可用">
                <el-option label="true" value="true"></el-option>
                <el-option label="false" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 采集路径 -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">采集路径</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="collectPath">
              <el-input v-model="ruleForm.collectPath" placeholder="/var/log/*.log"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 正则过滤(排除) -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">正则过滤(排除)</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="exclude_lines">
              <el-input v-model="ruleForm.exclude_lines" placeholder="['^DBG']"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 域、字段 -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">域、字段</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="fields">
              <el-input
                v-model="ruleForm.fields"
                placeholder="level: debug, app_id: query_engine_12"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第一个更多需要显示的内容 -->
        <el-row v-if="toShow">
          <el-row>
            <el-col :span="3.5">
              <span class="com">正则过滤(包含)</span>
            </el-col>
            <el-col :span="9.5">
              <el-form-item prop="include_lines">
                <el-input v-model="ruleForm.include_lines" placeholder="['^ERR','^WARN']"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3.5">
              <span class="com">正则过滤(忽略文件)</span>
            </el-col>
            <el-col :span="9.5">
              <el-form-item prop="exclude_files">
                <el-input v-model="ruleForm.exclude_files" placeholder="['\.gz$']"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 是否顶级 -->
          <el-row>
            <el-col :span="3.5">
              <span class="com">是否顶级</span>
            </el-col>
            <el-col :span="20.5">
              <el-form-item>
                <el-select v-model="ruleForm.enabled" placeholder="请选择是否可用">
                  <el-option label="true" value="true"></el-option>
                  <el-option label="false" value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!-- 第一个更多 -->
        <div class="more" v-if="isShow">
          <button @click.prevent="isShowBtn" class="moreBtn">更多...</button>
        </div>
        <!-- 多行处理配置 -->
        <el-row>
          <el-col :span="24">
            <p class="input-config ss">多行处理配置</p>
          </el-col>
        </el-row>

        <!-- 多行配置规则 -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">多行配置规则</span>
          </el-col>
          <el-col :span="9.5">
            <el-form-item prop="pattern">
              <el-input v-model="ruleForm.pattern" placeholder="^\["></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 是否正则转置 -->
        <el-row>
          <el-col :span="3.5">
            <span class="com">是否正则转置</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.isMaTo" placeholder="请选择活动区域">
                <el-option label="false" value="false"></el-option>
                <el-option label="true" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!--匹配行前、行后  -->

        <el-row>
          <el-col :span="3.5">
            <span class="com">匹配行前、行后</span>
          </el-col>
          <el-col :span="20.5">
            <el-form-item>
              <el-select v-model="ruleForm.match" placeholder="请选择活动区域">
                <el-option label="before" value="before"></el-option>
                <el-option label="after" value="after"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 合并最大行数 -->
        <el-row v-if="toShow1">
          <el-row>
            <el-col :span="3.5">
              <span class="com">合并最大行数</span>
            </el-col>
            <el-col :span="9.5">
              <el-form-item prop="maxMergerNum">
                <el-input v-model="ruleForm.maxMergerNum" placeholder="500"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 匹配超时 -->
          <el-row>
            <el-col :span="3.5">
              <span class="com">匹配超时</span>
            </el-col>
            <el-col :span="9.5">
              <el-form-item prop="matchTimeOut">
                <el-input v-model="ruleForm.matchTimeOut" placeholder="5s"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <div class="more" v-if="isShow1">
          <button @click.prevent="isShowBtn1" class="moreBtn">更多...</button>
        </div>

        <!-- 输出配置 -->
        <el-row>
          <el-col :span="24">
            <p class="input-config ss">输出配置</p>
          </el-col>
        </el-row>

        <div id="Towraper">
          <el-row>
            <el-col :span="3.5">
              <el-form-item style="margin-left:0px;width:203px ">
                <el-select v-model="ruleForm.type" @change="selectValueo">
                  <el-option label="logstash" value="logstash"></el-option>
                  <el-option label="elasticsearch" value="elasticsearch"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5.5" class="dizi">
              <el-form-item prop="content" style="margin-left:0px;width:350px">
                <el-input v-model="ruleForm.content" placeholder="请正确输入地址" :disabled="isDis"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1.5">
              <button @click.prevent="ToGetBtn" class="moreBtn ssd">获取</button>
            </el-col>
            <el-col :span="1.5">
              <button @click.prevent="plus" class="moreBtn ssd">+</button>
            </el-col>
          </el-row>
          <!-- 弹出来的索引 -->
          <el-row v-if="index1">
            <el-col :span="1.5" style="margin-left:235px;">
              <div class="lable">索引</div>
            </el-col>
            <el-col :span="5.7">
              <el-form-item prop="content_plus" style="margin-left:0px;width:350px">
                <el-input v-model="ruleForm.content_plus" placeholder="请正确输入地址" :disabled="isDis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in outData" :key="index">
            <el-row>
              <el-col :span="3.6">
                <el-form-item style="margin-left:0px;width:203px ">
                  <el-select v-model="ruleForm.oOutConfigs[index].type">
                    <el-option
                      label="logstash"
                      value="logstash"
                      @click.native.prevent="option1(index)"
                    ></el-option>
                    <el-option
                      label="elasticsearch"
                      value="elasticsearch"
                      @click.native.prevent="option2(index)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="5.5" class="dizi">
                <el-form-item style="margin-left:0px;width:350px">
                  <el-input
                    v-model="ruleForm.oOutConfigs[index].content"
                    placeholder="请正确输入地址"
                    :disabled="isDis"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1.5">
                <button @click.prevent="ToGet(index)" class="moreBtn ssd">获取</button>
              </el-col>
              <el-col :span="1.5">
                <button @click.prevent="divided(index)" class="moreBtn ssd">-</button>
              </el-col>
            </el-row>
            <!-- 弹出来的索引 -->
            <el-row class="ddd">
              <el-col :span="1.5" style="margin-left:235px;">
                <div class="lable">索引</div>
              </el-col>
              <el-col :span="5.7">
                <el-form-item style="margin-left:0px;width:350px">
                  <el-input
                    v-model="ruleForm.oOutConfigs[index].content_plus"
                    placeholder="请正确输入地址"
                    :disabled="isDis"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <!-- logstash的弹出框 -->
          <el-dialog title="Logstash 组件配置一览" :visible.sync="editFormVisibleLog">
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
                <el-table-column prop="clHost" label="地址"></el-table-column>
              </el-table>
              <el-row>
                <el-col :span="1.5" class="put">
                  <el-button type="danger" size="mini" @click.prevent="close">关闭</el-button>
                </el-col>
                <el-col :span="2" class="put">
                  <el-button type="primary" size="mini" @click.prevent="seleced">选择</el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <!-- el的弹出框 -->
          <el-dialog title="Elasticsearch 组件配置一览" :visible.sync="editFormVisibleEl">
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
                      v-model="templateRadios"
                      @change.native="getTemplateRow(scope.$index,scope.row)"
                    >&nbsp</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="platformName" label="平台名称"></el-table-column>
                <el-table-column prop="ceHost" label="地址"></el-table-column>
                <el-table-column prop="ceIndex" label="索引"></el-table-column>
              </el-table>
              <el-row>
                <el-col :span="1.5" class="put">
                  <el-button type="danger" size="mini" @click.prevent="close">关闭</el-button>
                </el-col>
                <el-col :span="2" class="put">
                  <el-button type="primary" size="mini" @click.prevent="elSelet">选择</el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
        </div>

        <!-- 第三个更多包含的内容 -->
        <div class="more" v-if="isShow2">
          <button @click.prevent="isShowBtn2" class="moreBtn">更多...</button>
        </div>

        <!-- 连接配置 -->
        <el-row>
          <el-col :span="24">
            <p class="input-config ss">连接配置</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3.5">
            <span class="com">远程服务器</span>
          </el-col>
          <el-col :span="5.5" class="dizi">
            <el-form-item prop="server" style="margin-left:0px;width:350px">
              <el-input v-model="ruleForm.server" placeholder="请正确输入连接名称" :disabled="isDis"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1.5">
            <button @click.prevent="serverGet" class="moreBtn ssd">获取</button>
          </el-col>
        </el-row>
        <div v-if="serverIf">
          <el-row>
            <el-col :span="5.7" style="margin-left:235px;">
              <el-form-item prop="protocol" style="margin-left:0px;width:350px">
                <el-input v-model="ruleForm.protocol" placeholder="请正确输入连接协议" :disabled="isDis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5.7" style="margin-left:235px;">
              <el-form-item prop="ip" style="margin-left:0px;width:350px">
                <el-input v-model="ruleForm.ip" placeholder="请正确输入地址及端口" :disabled="isDis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-dialog title="远程服务器配置一览" :visible.sync="editFormVisibleServer">
          <div>
            <el-table
              :data="serverData"
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
                    v-model="templateRadiosed"
                    @change.native="getTemplateRowed(scope.$index,scope.row)"
                  >&nbsp</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="riName" label="连接名称"></el-table-column>
              <el-table-column prop="riProtocol" label="连接协议"></el-table-column>
              <el-table-column prop="riIp" label="地址"></el-table-column>
              <el-table-column prop="riPort" label="端口"></el-table-column>
            </el-table>
            <el-row>
              <el-col :span="1.5" class="put">
                <el-button type="danger" size="mini" @click.prevent="closed">关闭</el-button>
              </el-col>
              <el-col :span="2" class="put">
                <el-button type="primary" size="mini" @click.prevent="elSeletd">选择</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
        <div class="new-incre">
          <el-button
            type="primary"
            plain
            class="btn"
            style="margin-left:10px"
            @click.native.prevent="preview('ruleForm')"
          >预览</el-button>
          <el-button
            type="primary"
            plain
            class="btn"
            @click.native.prevent="newIncreat('ruleForm')"
          >{{btnContent}}</el-button>
        </div>
        <el-dialog title="Filebeat 配置预览" :visible.sync="previews" width="60%">
          <div style="text-align:left">
            <pre v-highlight>
<code class="yml">
{{previewData}}
</code>
</pre>
            <el-row>
              <el-col :span="2" class="put">
                <el-button type="primary" size="mini" @click.prevent="toClosed">关闭</el-button>
              </el-col>
              <el-col :span="1.5" class="put">
                <el-button type="danger" size="mini" @click.prevent="toDownLoad">下载</el-button>
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
//代码高亮文件引入

export default {
  name: "filebeat",
  data() {
    return {
      ruleForm: {
        taskNameSelect: "", //任务名称下拉框
        subTaskNameSelect: "", //子任务名称下拉框
        taskName: "test", //实例名称
        collectPath: "", //采集路径
        fields: "", //域、字段
        pattern: "", //多行配置规则
        componentSelect: "filebeat", //组件选择
        inputStyle: "log", //文件的输入类型
        enabled: "true", //是否可用
        isMaTo: "false", //是否正则转置
        ip: "", //获取ip及端口
        protocol: "", //连接协议
        match: "before", //是否匹配行前后
        matchTimeOut: "", //匹配超时
        maxMergerNum: "", //合并最大行数
        content: "", //配置内容
        server: "", //连接名称
        outConfigBtn: "", //输出配置
        include_lines: "", //正则过滤包含
        exclude_files: "", //正则过滤忽略
        exclude_lines: "", //正则过滤排除
        fields_under_root: true, //是否顶级
        type: "logstash", //输出配置类型
        content_plus: "", //索引地址
        oOutConfigs: [], //把后添加的所有输出配置保存起来
        types: [], //用来装所有的后来添加的输配置的type值
        content_pluss: [], //用来装所有的后来添加的索引值
        contents: [] //用来装所有的后来添加的content值
      },
      serverId: "",
      editFormVisibleLog: false, //对获取框进行隐藏logstash
      editFormVisibleEl: false, //对获取框进行隐藏el
      editFormVisibleServer: false, //server的隐藏
      previews: false, //预览弹框
      index1: false,
      isDis: true, //点击获取按钮，输入框变成禁用
      outData: [],
      serverData: [],
      tableData: [], //logstash地址中表格数据
      templateRadio: "", //记录单选按钮的
      templateRadios: "",
      templateRadiosed: "",
      taskNameData: [], //任务名称下拉框
      subTaskNameData: [], //子任务名称下拉框
      isDisabled: true,
      serverIf: false, //服务器连接协议
      rules: {
        include_lines: [
          { required: true, message: "请输入正则过滤(包含)", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        exclude_lines: [
          { required: true, message: "请输入正则过滤(排除)", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        server: [
          { required: true, message: "请输入连接名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        exclude_files: [
          { required: true, message: "请输入正则过滤(忽略)", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请输入ip地址及端口", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        protocol: [
          { required: true, message: "请输入连接协议", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
          // { pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/, message: '请正确输入地址',trigger: "blur"}
        ],
        matchTimeOut: [
          { required: true, message: "请输入匹配超时", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        maxMergerNum: [
          { required: true, message: "请输入合并最大行数", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        taskName: [
          { required: true, message: "请输任务名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        collectPath: [
          { required: true, message: "请输入采集路径", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
          // { pattern:/^\/(\w+\/?)+$/, message: '请正确填写采集路径',trigger: "blur"}
        ],
        fields: [
          { required: true, message: "请输入域、字段", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        pattern: [
          { required: true, message: "请输入多行配置规则", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      //按钮内容
      btnContent: "新增",
      idd: "", //点击sever中的单选，将id发过去
      instanceIf: false, //实例名称的暂时隐藏，但是还是有值
      previewData: "", //预览数据
      isShow: true, // 控制第一个更多按钮是否隐藏
      isShow1: true, // 控制第二个更多按钮是否隐藏
      isShow2: true, // 控制第三个更多按钮是否隐藏
      toShow: false, //控制第一个更多对应的输入框进行显示
      toShow1: false, //控制第二个更多对应的输入框进行显示
      mindel1: false, //对第一个logstash的获取进行监控
      mindel2: false, //对第一个el的获取进行监控
      mindel3: false, //对新增的logstash的获取进行监控
      mindel4: false, //对新增的el的获取按钮进行获取
      logTemp: "", //logstash的中间变量
      elTemp: [], //el的中间变量
      IndeX: 0, //新增的中间变量
      object: Object
    };
  },
  updated() {
    //将索引项进行隐藏
    var option = document.getElementsByClassName("ddd");
    for (var e = 0; e < this.ruleForm.oOutConfigs.length; e++) {
      if (this.ruleForm.oOutConfigs[e].type == "logstash") {
        option[e].style.display = "none";
      }
    }
  },
  methods: {
    task(val) {
      console.log(val);
      this.ruleForm.subTaskNameSelect = "";
      httpService
        .request(api.taskGetAllSub, { tiId: val }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          if (data.success) {
            this.subTaskNameData = data.data;
            this.isDisabled = false;
          }
        });
    },
    //server获取
    serverGet() {
      this.editFormVisibleServer = true;
      httpService
        .request(api.remoteGetAll, { isPaged: false }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          console.log(data);
          this.serverData = data.data;
        });
    },

    //server弹出框
    //关闭
    closed() {
      this.editFormVisibleServer = false;
    },
    //选择
    elSeletd() {
      this.serverIf = true;
      this.templateRadiosed = "";
      this.editFormVisibleServer = false;
      this.ruleForm.server = this.object.riName;
      this.ruleForm.protocol = this.object.riProtocol;
      this.ruleForm.ip = this.object.riIp + ":" + this.object.riPort;
      this.idd = this.object.id;
    },

    //点击单选按钮事件
    getTemplateRowed(index, row) {
      this.object = row;
    },
    //预览下载
    toDownLoad(){
                 const paramssdd = {
            name: this.ruleForm.taskName, //任务名
            type: this.ruleForm.inputStyle, //输入类型
            enabled: JSON.parse(this.ruleForm.enabled), //是否可用
            paths: this.ruleForm.collectPath, //采集路径
            exclude_lines: this.ruleForm.exclude_lines, // 正则排除
            include_lines: this.ruleForm.include_lines, // 正则包含
            exclude_files: this.ruleForm.exclude_files, //正则忽略
            fields: this.ruleForm.fields, //域
            tiId: this.ruleForm.taskNameSelect,
            tsiId: this.ruleForm.subTaskNameSelect,
            riId: this.serverId,
            pattern: this.ruleForm.pattern, // 多行配置
            negate: true, //是否多行处理
            match: this.ruleForm.match, //匹配行前后
            output: [
              {
                type: this.ruleForm.type,
                content: this.ruleForm.content,
                content_plus: this.ruleForm.content_plus
              }
            ],

            fields_under_root: JSON.parse(this.ruleForm.fields_under_root), // 是否顶级
            timeout: parseInt(this.ruleForm.matchTimeOut), //匹配超时
            max_lines: parseInt(this.ruleForm.maxMergerNum) //最大合并行数
          };
          for (var z = 0; z < this.ruleForm.oOutConfigs.length; z++) {
            paramssdd.output.push(this.ruleForm.oOutConfigs[z]);
          }
         httpService.request(api.preview, paramssdd, "post").then(res => {
            const data = httpService.parseResp(res);
              console.log(res.data);
            var blob = new Blob([res.data], {
              type: "application/actet-stream;charset=utf-8"
            });
            var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            var filename = contentDisposition.slice(22, 34);
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
    toClosed(){       
       this.previews = false;
    },
    //预览接口
    preview(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const paramss = {
            name: this.ruleForm.taskName, //任务名
            type: this.ruleForm.inputStyle, //输入类型
            enabled: JSON.parse(this.ruleForm.enabled), //是否可用
            paths: this.ruleForm.collectPath, //采集路径
            exclude_lines: this.ruleForm.exclude_lines, // 正则排除
            include_lines: this.ruleForm.include_lines, // 正则包含
            exclude_files: this.ruleForm.exclude_files, //正则忽略
            fields: this.ruleForm.fields, //域
            tiId: this.ruleForm.taskNameSelect,
            tsiId: this.ruleForm.subTaskNameSelect,
            riId: this.serverId,
            pattern: this.ruleForm.pattern, // 多行配置
            negate: true, //是否多行处理
            match: this.ruleForm.match, //匹配行前后
            output: [
              {
                type: this.ruleForm.type,
                content: this.ruleForm.content,
                content_plus: this.ruleForm.content_plus
              }
            ],

            fields_under_root: JSON.parse(this.ruleForm.fields_under_root), // 是否顶级
            timeout: parseInt(this.ruleForm.matchTimeOut), //匹配超时
            max_lines: parseInt(this.ruleForm.maxMergerNum) //最大合并行数
          };
          for (var z = 0; z < this.ruleForm.oOutConfigs.length; z++) {
            paramss.output.push(this.ruleForm.oOutConfigs[z]);
          }
          httpService.request(api.preview, paramss, "post").then(res => {
            const data = httpService.parseResp(res);
            // console.log(res);
            // console.log("预览");
            this.previewData = res.data;
            this.previews = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 减号按钮
    divided(index) {
      this.outData.splice(index, 1);
      this.ruleForm.oOutConfigs.splice(index, 1);
    },
    // 获取按钮
    ToGet(index) {
      if (this.outData.length > 0) {
        if (this.ruleForm.oOutConfigs[index].type == "logstash") {
          this.editFormVisibleLog = true;
          this.mindel3 = true;
          this.IndeX = index;
          let formData = new FormData();
          formData.set("pageNo", 1);
          formData.set("pageSize", 5);
          httpService
            .request(api.getLogstashall, formData, "post")
            .then(res => {
              const data = httpService.parseResp(res);
              // console.log(data.data.list);
              this.tableData = data.data.list;
            });
        } else {
          this.editFormVisibleEl = true;
          this.mindel4 = true;
          this.IndeX = index;
          let formData = new FormData();
          formData.set("pageNo", 1);
          formData.set("pageSize", 5);
          httpService.request(api.getEsall, formData, "post").then(res => {
            const data = httpService.parseResp(res);
            // console.log(data.data.list);
            this.tableData = data.data.list;
          });
        }
      }
    },
    //logstash地址单选按钮的时间
    getTemplateRow(index, row) {
      this.templateRadio = row.id;
      if (this.mindel1 == true) {
        this.logTemp = row.clHost;
      }
      if (this.mindel2 == true) {
        this.elTemp[0] = row.ceHost;
        this.elTemp[1] = row.ceIndex;
      }
      if (this.mindel3 == true) {
        this.logTemp = row.clHost;
      }
      if (this.mindel4 == true) {
        this.elTemp[0] = row.ceHost;
        this.elTemp[1] = row.ceIndex;
      }
    },

    //关闭logstash弹框
    close() {
      this.editFormVisibleLog = false;
      this.editFormVisibleEl = false;
    },
    //对logstash弹出框进行选择
    seleced() {
      if (this.mindel1 == true) {
        this.ruleForm.content = this.logTemp;
        this.editFormVisibleLog = false;
        this.templateRadio = ""; //点击选择按钮后将选择之后的选项置空
      }
      if (this.mindel3 == true) {
        this.ruleForm.oOutConfigs[this.IndeX].content = this.logTemp;
        this.editFormVisibleLog = false;
        this.templateRadio = ""; //点击选择按钮后将选择之后的选项置空
      }
      this.mindel1 = false;
      this.mindel2 = false;
      this.mindel3 = false;
      this.mindel4 = false;
      this.logTemp = "";
      this.elTemp.splice(0, 2);
    },
    //对el弹出框的选择
    elSelet() {
      if (this.mindel2 == true) {
        this.ruleForm.content = this.elTemp[0];
        this.ruleForm.content_plus = this.elTemp[1];
        this.editFormVisibleEl = false;
        this.templateRadios = ""; //点击选择按钮后将选择之后的选项置空
      }
      if (this.mindel4 == true) {
        this.ruleForm.oOutConfigs[this.IndeX].content = this.elTemp[0];
        this.ruleForm.oOutConfigs[this.IndeX].content_plus = this.elTemp[1];
        this.editFormVisibleEl = false;
        this.templateRadios = ""; //点击选择按钮后将选择之后的选项置空
      }
      this.mindel1 = false;
      this.mindel2 = false;
      this.mindel3 = false;
      this.mindel4 = false;
      this.logTemp = "";
      this.elTemp.splice(0, 2);
    },
    ToGetBtn() {
      //logstash
      if (this.ruleForm.type == "logstash") {
        this.editFormVisibleLog = true;
        this.mindel1 = true;
        let formData = new FormData();
        formData.set("pageNo", 1);
        formData.set("pageSize", 5);
        httpService.request(api.getLogstashall, formData, "post").then(res => {
          const data = httpService.parseResp(res);
          // console.log(data.data.list);
          this.tableData = data.data.list;
        });
      } else {
        this.editFormVisibleEl = true;
        this.mindel2 = true;
        let formDatas = new FormData();
        formDatas.set("pageNo", 1);
        formDatas.set("pageSize", 5);
        httpService.request(api.getEsall, formDatas, "post").then(res => {
          const data = httpService.parseResp(res);
          this.tableData = data.data.list;
        });
      }
    },
    //el按钮获取的方法
    // 点击加号进行添加
    plus() {
      var Towraper = document.getElementById("Towraper");
      for (
        var j = Towraper.children.length - 1;
        j < Towraper.children.length;
        j++
      ) {
        this.outData.push({
          indexIf: true
        });
        //将后添加的输出配置全部保存起来值保存起来
        this.ruleForm.oOutConfigs.push({
          type: "logstash",
          content_plus: "",
          content: ""
        });
      }
    },

    //点击logstash进行隐藏
    option1(index) {
      var option = document.getElementsByClassName("ddd");
      option[index].style.display = "none";
      this.ruleForm.oOutConfigs[index].content = "";
      this.ruleForm.oOutConfigs[index].content_plus = "";
    },
    // 点击es进行显示
    option2(index) {
      var option = document.getElementsByClassName("ddd");
      option[index].style.display = "block";
      this.ruleForm.oOutConfigs[index].content = "";
    },
    selectValueo(val) {
      //控制第一个索引值显示隐藏
      val === "logstash" ? (this.index1 = false) : (this.index1 = true);
      if (val == "logstash") {
        this.ruleForm.content = "";
        this.ruleForm.content_plus = "";
      } else {
        this.ruleForm.content = "";
      }
    },

    //置空
    empty() {
      this.ruleForm.taskName = "";
      this.ruleForm.collectPath = "";
      this.ruleForm.exclude_lines = "";
      this.ruleForm.fields = "";
      this.ruleForm.pattern = "";
      this.ruleForm.content = "";
      this.serverIf = false;
      this.ruleForm.server = "";
      this.index1 = false;
      this.ruleForm.type = "logstash";
      this.ruleForm.maxMergerNum = "";
      this.ruleForm.matchTimeOut = "";
      this.ruleForm.include_lines = "";
      this.ruleForm.exclude_files = "";
      this.ruleForm.taskNameSelect = "";
      this.ruleForm.subTaskNameSelect = "";
      this.toShow = false;
      this.toShow1 = false;
      this.isShow = true;
      this.isShow1 = true;
      this.isShow2 = true;
    },
    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    //控制第一个更多按钮是否隐藏
    isShowBtn() {
      this.isShow = false; // 对更多按钮进行隐藏
      this.toShow = true; // 对正则输入框进行显示
    },
    //控制第二个更多按钮
    isShowBtn1() {
      this.isShow1 = false;
      this.toShow1 = true;
    },
    //控制第三个按钮
    isShowBtn2() {
      this.isShow2 = false;
    },

    //新增,按钮
    newIncreat(formName) {
      // 新增时的参数
      const param = {
        name: this.ruleForm.taskName, //任务名
        type: this.ruleForm.inputStyle, //输入类型
        enabled: JSON.parse(this.ruleForm.enabled), //是否可用
        paths: this.ruleForm.collectPath, //采集路径
        exclude_lines: this.ruleForm.exclude_lines, // 正则排除
        include_lines: this.ruleForm.include_lines, // 正则包含
        exclude_files: this.ruleForm.exclude_files, //正则忽略
        fields: this.ruleForm.fields, //域
        tiId: this.ruleForm.taskNameSelect,
        tsiId: this.ruleForm.subTaskNameSelect,
        pattern: this.ruleForm.pattern, // 多行配置
        negate: true, //是否多行处理
        match: this.ruleForm.match, //匹配行前后
        riId: this.idd, //将server单选的id传过去
        output: [
          {
            type: this.ruleForm.type,
            content: this.ruleForm.content,
            content_plus: this.ruleForm.content_plus
          }
        ],

        fields_under_root: JSON.parse(this.ruleForm.fields_under_root), // 是否顶级
        timeout: parseInt(this.ruleForm.matchTimeOut), //匹配超时
        max_lines: parseInt(this.ruleForm.maxMergerNum) //最大合并行数
      };
      for (var z = 0; z < this.ruleForm.oOutConfigs.length; z++) {
        param.output.push(this.ruleForm.oOutConfigs[z]);
      }
      //console.log(param);
      //修i该时的参数
      const param1 = {
        id: this.$route.params.setId, //需要修改的id
        name: this.ruleForm.taskName, //需要修改的任务名称
        type: this.ruleForm.inputStyle, //需要修改的输入类型
        enabled: JSON.parse(this.ruleForm.enabled), // 是否可用 ， 用json转换成布尔值
        paths: this.ruleForm.collectPath, // 需要修改的采集路径
        exclude_lines: this.ruleForm.exclude_lines, // 休要修改的正则
        include_lines: this.ruleForm.include_lines, //需要修改的正则
        exclude_files: this.ruleForm.exclude_files, // 需要修i该的正则
        fields: this.ruleForm.fields, // 休要修改的域/字段
        pattern: this.ruleForm.pattern, //
        tiId: this.ruleForm.taskNameSelect,
        tsiId: this.ruleForm.subTaskNameSelect,
        negate: true,
        riId: this.serverId, //将server单选的id传过去
        match: this.ruleForm.match,
        output: [
          //  输出类型
          {
            type: this.ruleForm.type,
            content:  this.ruleForm.content,
            content_plus:this.ruleForm.content_plus
          }
        ],

        timeout: parseInt(this.ruleForm.matchTimeOut), //匹配超时
        max_lines: parseInt(this.ruleForm.maxMergerNum) //最大合并行数
      };
        for (var q = 0; q < this.ruleForm.oOutConfigs.length; q++) {
        param1.output.push(this.ruleForm.oOutConfigs[q]);
      }
      //所有必填项在不为空的情况下发送请求
      if (this.btnContent == "新增") {
        //如果符合条件发送请求
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否新增?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                //点击确定后发送新增请求
                httpService.request(api.Add, param, "post").then(res => {
                  const data = httpService.parseResp(res);
                  if (data.success) {
                    this.$message({
                      type: "success",
                      message: "新增成功"
                    });
                    //置空数据
                    this.empty();
                    this.outData.splice(0, this.outData.length);
                    this.ruleForm.oOutConfigs.splice(
                      0,
                      this.ruleForm.oOutConfigs.length
                    );
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
        console.log(param1);
        console.log(this.ruleForm.oOutConfigs);
        console.log("我是保存时的请求参数");
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("是否修改?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                //修改数据的接口
                httpService.request(api.Undate, param1, "post").then(res => {
                  const data = httpService.parseResp(res);
                  if (data.success) {
                    //返回一览页,并将路由里面的参数
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
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  },
  mounted: function() {
    if (this.$route.params.compType == "Filebeat") {
      this.btnContent = "保存";
    }
  },
  created() {
    //将需要修改的数据进行渲染
    if (this.$route.params.setId != undefined) {
      const getparams = {
        id: this.$route.params.setId
      };
      httpService
        .request(api.taskGetAllSub, { tiId: this.$route.params.tiId }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          console.log(data);
          if (data.success) {
            this.subTaskNameData = data.data;
          }
        });
      //请求获得配置接口
      httpService.request(api.Get, getparams, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data);
        console.log("我是需要修改的数据");
        if (data.success) {
          this.ruleForm.taskName = data.data.fName; //需要修改的任务名
          this.ruleForm.collectPath = data.data.fPaths; //需要修改的采集路径
          this.ruleForm.pattern = data.data.fPattern; // 需要修改的多行配置
          this.ruleForm.enabled = data.data.fEnabled; //需要修改的是否可用
          this.serverId = data.data.riId;
          httpService
            .request(api.remoteGet, { id: data.data.riId }, "post")
            .then(res => {
              const data = httpService.parseResp(res);
              if (data.success) {
                this.serverIf = true;
                this.ruleForm.server = data.data.riName;
                this.ruleForm.protocol = data.data.riProtocol;
                this.ruleForm.ip = data.data.riIp + ":" + data.data.riPort;
              }
            });
          this.ruleForm.exclude_lines = data.data.fExcludeLines; //需要修改的正则
          this.ruleForm.fields = data.data.fFields; //需要修改的域、字段
          this.ruleForm.taskNameSelect = data.data.tiId;
          this.ruleForm.subTaskNameSelect = data.data.tsiId;
          this.ruleForm.backConfigData = data.data.output; //将返回来的数据村起来port
          if (data.data.output[0].foType == "elasticsearch") {
            this.index1 = true;
            this.ruleForm.type = "elasticsearch";
            this.ruleForm.content = data.data.output[0].foContent; //需要修改输出配置内容
            this.ruleForm.content_plus = data.data.output[0].foContentPlus; //
          } else {
            this.index1 = false;
            this.ruleForm.type = "logstash";
            this.ruleForm.content = data.data.output[0].foContent;
          }
          for (var q = 1; q < data.data.output.length; q++) {
            this.outData.push(data.data.output[q]);
            //将需要修改的页面数据还原页面
            this.ruleForm.oOutConfigs.push({
              type: data.data.output[q].foType,
              content_plus: data.data.output[q].foContentPlus,
              content: data.data.output[q].foContent
            });
          }
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
        this.taskNameData = data.data;
      }
    });
  }
};
</script>

<style scoped>
.file-beat {
  width: 100%;
  height: 100%;
}
.file-beat-content {
  width: 80%;
  margin: 0 auto;
}

.select-item {
  width: 250px;
  height: 34px;
  margin-left: 25px;
}
.select-ite {
  width: 500px;
  height: 30px;
  margin-left: 25px;
}
.select-it {
  width: 409px;
  height: 30px;
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
.output {
  width: 200px;
  height: 34px;
  margin-top: 15px;
  border-radius: 5px;
  border: 0.5px solid #a9a9a9;
}
.user_name {
  width: 250px;
  height: 30px;
  margin-left: 25px;
}
.new-incre {
  width: 740px;
  height: 30px;
  margin: 15px 0 30px 0;
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
  margin-right: 5px;
  border: 0;
}
.get {
  border: 0;
  outline: none;
  width: 65px;
  height: 26px;
  color: white;
  cursor: pointer;
  background: #a6a9ad;
  border-radius: 15px;
  margin-left: 16px;
  line-height: 9px;
}
#btnPlus {
  display: inline-block;
  width: 35px;
  height: 39px;
}

.DisStyle {
  background: #eeeeee;
  color: #757575;
}
.more {
  height: 35px;
  line-height: 35px;
  width: 736px;
  overflow: hidden;
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
.aDress {
  display: inline-block;
  width: 60px;
  height: 32px;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  border: 0.5px solid #a9a9a9;
  border-radius: 3px;
  margin: 0 25px;
}
.aDress1 {
  display: inline-block;
  width: 60px;
  height: 32px;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  border: 0.5px solid #a9a9a9;
  border-radius: 3px;
  margin: 15px 25px 0 231px;
}
.toGet {
  display: inline-block;
  border: 1px solid #a9a9a9;
  width: 50px;
  height: 32px;
  vertical-align: bottom;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  background: #f7f7f7;
  border-radius: 3px;
}
.ff {
  height: 39px;
  line-height: 39px;
  margin: 0 14px;
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
.INDEX {
  width: 80%;
  display: -webkit-flex;
  padding-left: 204px;
}
.coms {
  width: 201px;
  height: 40px;
  border: 0.5px solid #a9a9a9;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  margin-right: 30px;
  margin-bottom: 15px;
  display: block;
}
.file {
  margin-top: 40px;
}
.lable {
  width: 68px;
  height: 38px;
  background: #f4f4f5;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: #94979d;
  border: 1px solid #d3d4d6;
  font-size: 14px;
  margin-left: 3px;
}
.ssa {
  width: 68px;
  height: 38px;
  background: #f4f4f5;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: #94979d;
  border: 1px solid #d3d4d6;
  font-size: 14px;
}
.el-col-offset-3 {
  margin-left: 12.4%;
}
.put {
  float: right;
  margin: 15px 10px 0 0;
}
.dizi {
  margin-left: 33px;
}
.el-dialog {
  width: 80%;
}
.ssd {
  margin-left: 10px;
}
</style>