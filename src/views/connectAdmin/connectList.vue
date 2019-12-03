<template>
  <div class="connect-list">
    <div class="fileBeatList-content">
      <div class="tabl">
        <!-- 表格数据展示 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :cell-style="rowstyle"
          :header-cell-style="headStyle"
        >
          <!-- ALL -->
          <el-table-column prop="riName" label="连接名称"></el-table-column>
          <el-table-column prop="riProtocol" label="连接协议"></el-table-column>
          <el-table-column prop="riIp" label="地址"></el-table-column>
          <el-table-column prop="riPort" label="端口"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope)" size="small">编辑</el-button>
              <el-button @click="handleDele(scope)" type="danger" size="small" class="dele">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页效果 -->
        <div class="pagWraper">
          <el-pagination
            class="pages"
            @current-change="handleCurrentChange"
            :page-size="5"
            background
            :total="this.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LogstashGetall, api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "fileBeatList",
  methods: {
    //表格修改事件
    handleClick(scope) {
      console.log(scope);
      //根据组件类型的不同跳转不同的页面进行修改
      this.$router.push({
        name: "connectConfig",
        params: { setId: scope.row.id } //将需要修改行的id和组件类型传到新增数据页
      });
    },
    //表格删除事件
    handleDele(scope) {
      //删除提示的弹窗
      console.log(scope);// 点击删除行的id
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //删除数据的ajax
        const paramDeleIDs = {
          id: scope.row.id,
          ip:scope.row.riIp,
          name:scope.row.riName,
          password:scope.row.riPassword,
          port:scope.row.riPort,
          protocol:scope.row.riProtocol,
          user:scope.row.riUser
        };
        httpService.request(api.remoteDelete, paramDeleIDs, "post").then(res => {
          const data = httpService.parseResp(res);
          console.log(data);
          if (data.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.tableData.splice(scope.$index, 1);
            this.total--;
          } else {
            this.$message({
              type: "info",
              message: "删除失败"
            });
          }
        });
        //将当前行删除
      });
    },

    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },

    // 即点击页码之后请求的数据
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //转换成formData
      let formData = new FormData();
      formData.set("pageNo", this.currentPage);
      formData.set("pageSize", 5);
      formData.set("isPaged", true);
      //发送请求，获取表格一览数据
      httpService.request(api.remoteGetAll, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data);
        console.log("ddd");
        this.total = data.data.total;
        this.tableData = data.data.list;
      });
    },



    // 初始化数据，即第一页显示的数据,发送的是formdata参数
    unitDATAs() {
      let formDatas = new FormData();
      formDatas.set("pageNo", 1);
      formDatas.set("pageSize", 5);
      formDatas.set("isPaged", true);
      //表格初始化数据,filebeat
      httpService.request(api.remoteGetAll, formDatas, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data);
        console.log("ffffff");
        // console.log(data.data.list);
        this.total = data.data.total;
        this.tableData = data.data.list;
        console.log(this.tableData);
      });
    }
  },
  created() {
    //发起请求拿到一览列表的初始化数据
    this.unitDATAs();
  },
  data() {
    return {
      currentPage: 1, //当前页码
      total: 1, //总数据
      // 表格渲染的数据
      tableData: []
    };
  }
};
</script>

<style scoped>
.connect-list {
  width: 100%;
}
.fileBeatList-content {
  overflow: hidden;
}
.tabl {
  width: 80%;
  margin-top: 78px;
  margin: 0 auto;
  margin-top: 20px;
}
.pagWraper {
  width: 100%;
  height: 32px;
  margin-top: 10px;
}
.el-pagination {
  text-align: center;
}
</style>