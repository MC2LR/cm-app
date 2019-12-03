<template>
  <div class="file-beat-list" @click.self="blure">
    <div class="fileBeatList-content" @click.self="bulrs">
      <div class="tabl" @click.self="bulred">
        <!-- 表格数据展示 -->
        <el-row>
          <el-col :span="1.5" class="put" style="margin-right: 110px;margin-bottom: 10px;">
            <el-button type="danger" size="mini" icon="el-icon-delete-solid" @click="dataDelets">删除</el-button>
          </el-col>
          <el-col :span="2.5" class="put DISS">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="increace">新增</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width:80%;margin:0 auto"
          :cell-style="rowstyle"
          :header-cell-style="headStyle"
          @selection-change="handleSelectionChange"
        >
          <!-- ALL -->
          <el-table-column type="selection" width="100"></el-table-column>
          <!-- 用插槽给表格绑定上单独数据 -->
          <el-table-column label="名称">
            <template slot-scope="scope">
              <div v-if="!scope.row.edit">{{scope.row.piName}}</div>
              <div v-if="scope.row.edit">
                <el-input v-model="scope.row.piNameValue" v-focus @blur="blurEvent(scope)" @focus="foucsEvent"  placeholder="请输入要添加的内容"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click.stop="handleClick(scope.row,scope)"
                size="small"
                class="editNum"
              >{{scope.row.btn}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { LogstashGetall, api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "fileBeatList",
  data() {
    return {
      // 表格渲染的数据
      tableData: [],
      deleteData: [],
      index:false,
      indexTemp:3,
    };
  },
  directives: {
    focus: {
        inserted: function (el) {
        el.querySelector('input').focus()
        }
    }
},
  methods: {
    // 本页面点击事件
    blure(){
      this.tableData[this.indexTemp].edit = false;
      this.tableData[this.indexTemp].btn = "编辑";
      console.log(this.tableData);
    },
    bulrs(){
            this.tableData[this.indexTemp].edit = false;
      this.tableData[this.indexTemp].btn = "编辑";
      },
    bulred(){
      this.tableData[this.indexTemp].edit = false;
      this.tableData[this.indexTemp].btn = "编辑";

    },
    foucsEvent(){
      this.index = false;
    },
    //输入框失焦时的事件
    blurEvent(scope){
      this.indexTemp = scope.$index;
      console.log(this.indexTemp);
      if(this.index == true){
        scope.row.edit = false;
        scope.row.btn = "编辑";
      }
    },
    //   点击单选按钮打印当前行信息
    handleSelectionChange(val) {
      //每次点击先清空，
      this.deleteData.splice(0, this.deleteData.length);
      //清空后再重新赋所有的值
      for (var y = 0; y < val.length; y++) {
        this.deleteData.push({
          id: val[y].id
        });
      }
    },

    //表格修改事件
    handleClick(data, scope) {
      if (data.btn == "编辑") {
        data.edit = !data.edit;
        data.btn = "保存";
      } else {
        //新增=的数据没有id，根据此进行判断
        if (data.id != undefined) {
          const param = {
            id: data.id,
            name: data.piNameValue
          };
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              httpService
                .request(api.platformUpdate, param, "post")
                .then(res => {
                  const data = httpService.parseResp(res);
                  if (data.success) {
                    data.btn = "编辑";
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                    this.unitDATA();
                    this.index = true;
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
          data.edit = !data.edit;
          const param = {
            name: data.piNameValue
          };
          this.$confirm("是否新增", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              httpService.request(api.platformAdd, param, "post").then(res => {
                const data = httpService.parseResp(res);
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  this.unitDATA();
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
        }
      }
    },
    //删除按钮
    dataDelets() {
      console.log(this.deleteData);
      if (this.deleteData.length == 0) {
        this.$message({
          type: "info",
          message: "请勾选要删除的选项"
        });
      } else {
        this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            httpService
              .request(api.platformDelete, this.deleteData, "post")
              .then(res => {
                const data = httpService.parseResp(res);
                if (data.success) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.unitDATA();
                }
                console.log(data);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //新增按钮
    increace() {
      this.tableData.push({
        edit: true,
        piNameValue: "",
        btn: "保存"
      });
    },
    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },

    // 初始化数据，即第一页显示的数据,发送的是formdata参数
    unitDATA() {
      //表格初始化数据,filebeat
      httpService
        .request(api.platformgetAll, { isPaged: false }, "post")
        .then(res => {
          const data = httpService.parseResp(res);
          console.log(data.data);
          this.tableData = data.data.map(item => {
            return Object.assign({}, item, {
              edit: false,
              piNameValue: item.piName,
              btn: "编辑"
            });
          });
        });
    }
  },
  created() {
    //发起请求拿到一览列表的初始化数据
    this.unitDATA();
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
  padding-top: 100px;
}
.tabl {
  width: 70%;
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
.put {
  float: right;
}
.DISS{
  margin-right: 10PX;
}
</style>


