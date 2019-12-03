<template>
  <div class="index">
    <!-- aside部分 -->
    <div class="navv">
      <el-row>
        <el-col>
          <el-menu
            text-color="#fff"
            background-color="#324057"
            style="border-right:0px;border-bottom:1px solid #435265"
            :default-active="this.default"
          >
            <el-menu-item
              style="font-weight:800;font-size:16px;color:#BFCBD9; border-bottom:1px solid #435265"
            >
              <i class="el-icon-menu"></i>应用技术平台
            </el-menu-item>
            <el-submenu index="1" style="border-bottom:1px solid #435265">
              <template slot="title" style="width:250px;">
                <i class="el-icon-s-tools"></i>平台管理
              </template>
              <router-link tag="div" to="dataplatform">
                <el-menu-item style="width:300px" index="1-1" >大数据平台管理</el-menu-item>
              </router-link>
              <el-submenu index="1-2">
                <template slot="title">组件配置管理</template>
                <router-link tag="div" to="configList">
                  <el-menu-item style="width:300px" index="1-2-1">组件列表展示</el-menu-item>
                </router-link>
                <router-link tag="div" to="logstashConfig">
                  <el-menu-item style="width:300px" index="1-2-2">Logstash 组件配置</el-menu-item>
                </router-link>
                <router-link tag="div" to="kafkaConfig">
                  <el-menu-item style="width:300px" index="1-2-3">Kafka 组件配置</el-menu-item>
                </router-link>
                <router-link tag="div" to="esConfig">
                  <el-menu-item style="width:300px" index="1-2-4">Elasticsearch 组件配置</el-menu-item>
                </router-link>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">远程连接管理</template>
                <router-link tag="div" to="connectList">
                  <el-menu-item style="width:300px" index="1-3-1">远程连接列表展示</el-menu-item>
                </router-link>
                <router-link tag="div" to="connectConfig">
                  <el-menu-item style="width:300px" index="1-3-2">远程连接配置</el-menu-item>
                </router-link>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2"  style="border-bottom:1px solid #435265">
              <template slot="title" style="width:250px">
                <i class="el-icon-suitcase"></i>任务管理
              </template>
              <el-submenu index="2-1">
                <template slot="title">任务配置管理</template>
                <router-link tag="div" to="taskList">
                  <el-menu-item style="width:300px" index="2-1-1">任务列表展示</el-menu-item>
                </router-link>
                <router-link tag="div" to="taskAdd">
                  <el-menu-item style="width:300px" index="2-1-2">任务配置</el-menu-item>
                </router-link>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title">子任务配置管理</template>
                <router-link tag="div" to="subTaskList">
                  <el-menu-item style="width:300px" index="2-2-1">子任务列表展示</el-menu-item>
                </router-link>
                <router-link tag="div" to="subTaskAdd">
                  <el-menu-item style="width:300px" index="2-2-2">子任务新增</el-menu-item>
                </router-link>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title" style="color:#BFCBD9;">
                <i class="el-icon-plus"></i>采集管理
              </template>
              <router-link tag="div" to="fileBeatList">
                <el-menu-item style="width:300px" index="3-1">组件列表展示</el-menu-item>
              </router-link>
              <el-submenu index="3-2">
                <template slot="title">组件配置管理</template>
                <router-link tag="div" to="filebeat">
                  <el-menu-item style="width:300px" index="3-2-1">Filebeat 组件配置</el-menu-item>
                </router-link>
                <router-link tag="div" to="logstash">
                  <el-menu-item style="width:300px" index="3-2-2">Logstash 组件配置</el-menu-item>
                </router-link>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 内容部分 -->
    <div class="nav-list">
      <CommonInfo :titData='titleData'/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CommonInfo from "../components/commonInfo";
import { mapState,mapMutations } from "vuex";

export default {
  data() {
    return {
      default: "1-1",
      titleData:"",
    };
  },
  components: {
    CommonInfo
  },
  updated: function() {
    this.routee();
  },
  created() {
    this.titleData = '大数据平台管理'
    this.routee();
  },
  
  methods: {
    routee() {
      if (this.$route.fullPath == "/logstash") {
        this.default = "3-2-2";
        this.titleData = 'Logstash 组件配置'
      }
      if (this.$route.fullPath == "/logstashConfig") {
        this.default = "1-2-2";
        this.titleData = 'Logstash 组件配置'

      }
      if (this.$route.fullPath == "/fileBeatList") {
        this.default = "3-1";
        this.titleData = '组件列表展示'

      }
      if (this.$route.fullPath == "/kafkaConfig") {
        this.default = "1-2-3";
        this.titleData = 'Kafka 组件配置'

      }
      if (this.$route.fullPath == "/esConfig") {
        this.default = "1-2-4";
        this.titleData = 'Elasticsearch 组件配置'

      }
      if (this.$route.fullPath == "/configList") {
        this.default = "1-2-1";
        this.titleData = '组件列表展示'

      }
      if (this.$route.fullPath == "/dataplatform") {
        this.default = "1-1";
        this.titleData = '大数据平台管理'
      }
       if (this.$route.fullPath == "/taskAdd") {
        this.default = "2-1-2";
        this.titleData = '任务配置'

      }
       if (this.$route.fullPath == "/taskList") {
        this.default = "2-1-1";
        this.titleData = '任务列表展示'

      }
       if (this.$route.fullPath == "/subTaskAdd") {
        this.default = "2-2-2";
        this.titleData = '子任务新增'

      }
       if (this.$route.fullPath == "/subTaskList") {
        this.default = "2-2-1";
        this.titleData = '子任务列表展示'

      }
       if (this.$route.fullPath == "/connectConfig") {
        this.default = "1-3-2";
        this.titleData = '远程连接配置'

      }
       if (this.$route.fullPath == "/connectList") {
        this.default = "1-3-1";
        this.titleData = '远程连接列表展示'
      }
       if (this.$route.fullPath == "/filebeat") {
        this.default = "3-2-1";
        this.titleData = 'Filebeat 组件配置'
      }
    }
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  display: -webkit-flex;
  height: 100%;
}
.navv {
  background: #324057;
  width: 300px;
  overflow-y: auto;
}
.nav-list {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>