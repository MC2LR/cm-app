<template>
  <div class="file-beat-list">
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
          <el-table-column prop="cName" label="实例名称" v-if="col"></el-table-column>
          <el-table-column prop="tiName" label="任务名称"></el-table-column>
          <el-table-column prop="tsiName" label="子任务名称"></el-table-column>
          <el-table-column prop="componentType" label="组件类型"></el-table-column>
          <el-table-column prop="crateTime" label="创建时间"></el-table-column>
          <el-table-column prop="crateUser" label="创建人"></el-table-column>
          <el-table-column label="操作" width="358">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope)" size="small">编辑</el-button>
              <el-button @click="handleDele(scope)" type="danger" size="small" class="dele" :disabled=scope.row.idDet>删除</el-button>
              <el-button size="small" type="primary" :disabled=scope.row.isDis>启动</el-button>
              <el-button size="small" type="primary" :disabled=scope.row.isDis>停止</el-button>
              <el-button size="small" type="success" @click="down(scope)">下载</el-button>
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
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "fileBeatList",
  methods: {
    //下载事件
    down(scope) {
      if (scope.row.componentType == "Filebeat") {
        this.axios({
          // 用axios发送post请求
          method: "post",
          url: "http://172.16.101.112:9966/api/common/downloadFilebeat", // 请求地址
          data: { id: scope.row.id }, // 参数
          responseType: "blob" // 表明返回服务器返回的数据类型
        }).then(res => {
          console.log(res);
          // 处理返回的文件流
          if (res.data.size == 0) {
            this.$message.error('下载失败,请联系管理员！');
          } else {
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
          }
        });
      } else {
        console.log(scope);
        this.axios({
          // 用axios发送post请求
          method: "post",
          url: "http://172.16.101.112:9966/api/common/downloadLogstash", // 请求地址
          data: { id: scope.row.id }, // 参数
          responseType: "blob" // 表明返回服务器返回的数据类型
        }).then(res => {
          // 处理返回的文件流
          if (res.data.size == 0) {
            this.$message.error('下载失败,请联系管理员！');

          }else{
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
          }
        });
      }
    },
    //表格修改事件
    handleClick(scope) {
      console.log(scope);
      //根据组件类型的不同跳转不同的页面进行修改
      if (scope.row.componentType == "Filebeat") {
        this.$router.push({
          name: "filebeat",
          params: {
            compType: scope.row.componentType,
            setId: scope.row.id,
            tiId: scope.row.tiId
          } //将需要修改行的id和组件类型传到新增数据页
        });
      }
      if (scope.row.componentType == "Logstash") {
        this.$router.push({
          name: "logstash",
          params: {
            compType: scope.row.componentType,
            setId: scope.row.id,
            tiId: scope.row.tiId
          } //将需要修改行的id和组件类型传到新增数据页
        });
      }
    },
    //表格删除事件
    handleDele(scope) {
      console.log(scope);
      //删除提示的弹窗
      //console.log(scope.row.id); 点击删除行的id
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //删除数据的ajax
        const paramDeleID = {
          id: scope.row.id
        };
        //删除请求
        //console.log(scope.row.componentType);
        if (scope.row.componentType == "Logstash") {
          httpService
            .request(api.logstashDelet, paramDeleID, "post")
            .then(res => {
              const data = httpService.parseResp(res);
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
              console.log(res);
            });
          //将当前行删除
        } else {
          httpService.request(api.Delet, paramDeleID, "post").then(res => {
            const data = httpService.parseResp(res);
            console.log(res);
            if (data.success) {
              this.tableData.splice(scope.$index, 1);
              this.total--;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败"
              });
            }
          });
        }
      });
    },

    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },

    //即点击页码之后请求的数据
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //转换成formData
      let formData = new FormData();
      formData.set("pageNo", this.currentPage);
      formData.set("pageSize", 5);
      //发送请求，获取表格一览数据
      httpService.request(api.conmmonGetAll, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data);
        this.total = data.data.total;
        this.tableData = data.data.list;
      });
    },
    // 初始化数据，即第一页显示的数据,发送的是formdata参数
    unitData() {
      //初始化默认第一页
      let formData = new FormData();
      formData.set("pageNo", 1);
      formData.set("pageSize", 5);
      //表格初始化数据,filebeat
      httpService.request(api.conmmonGetAll, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data);
        this.total = data.data.total;
        this.tableData = data.data.list.map(item => {
            return Object.assign({}, item, {
               isDis:false,
               idDet:false
            });
          });

        for(var u=0;u<this.tableData.length;u++){
          if(this.tableData[u].tsiId == ""){
            this.tableData[u].isDis = true;
          }
          if(this.tableData[u].status == "true"){
            this.tableData[u].idDet = true;
          } 
        }
        console.log(this.tableData);
      });
    }
  },
  created() {
    //发起请求拿到一览列表的初始化数据
    this.unitData();
  },
  data() {
    return {
      currentPage: 1, //当前页码
      total: 1, //总数据
      // 表格渲染的数据
      tableData: [],
      col:false,//表格中的实例名称列暂时隐藏
    };
  }
};
</script>

<style scoped>
.file-beat-list {
  width: 100%;
  height: 100%;
}
.fileBeatList-content {
  overflow: hidden;
}
.tabl {
  width: 96%;
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