<template>
  <div class="task-list">
    <div class="task-content">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="任务名称">
          <el-input v-model="formInline.taskName" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="责任人">
          <el-input v-model="formInline.dutyPerson" placeholder="责任人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableDatas"
        border
        style="width: 100%"
        :cell-style="rowstyle"
        :header-cell-style="headStyle"
      >
        <!-- ALL -->
        <el-table-column prop="tiName" label="任务名称"></el-table-column>
        <el-table-column prop="tiPerson" label="责任人"></el-table-column>
        <el-table-column prop="crateUser" label="创建人"></el-table-column>
        <el-table-column prop="crateTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateUser" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClicksss(scope)" size="small">编辑</el-button>
            <el-button @click="handleDeless(scope)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { api } from "../../api/api_system";
import { httpService } from "../../service/http.service";
export default {
  name: "taskList",
  data() {
    return {
      formInline: {
        taskName: "",
        dutyPerson: ""
      },
      tableDatas: [] //表格总数据
    };
  },
  created() {
    //发起请求拿到一览列表的初始化数据
    this.unitDatas();
  },
  methods: {
    //初始化表格数据
    unitDatas() {
      let formData = new FormData();
      formData.set("pageNo", 1);
      formData.set("pageSize", 5);
      httpService.request(api.taskGetAll, formData, "post").then(res => {
        const data = httpService.parseResp(res);
        if (data.success) {
          this.tableDatas = data.data;
        }
      });
    },
    //删除事件
    handleDeless(datas) {
      console.log(datas.row);
      const paramse = {
        content: datas.row.tiContent,
        id: datas.row.id,
        name:datas.row.tiName,
        person:datas.row.tiPerson
      };
        this.$confirm("是否删除此任务以及所包含所有子任务?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                //点击确定后发送新增请求
                httpService.request(api.taskDelete, paramse, "post").then(res => {
                  const data = httpService.parseResp(res);
                  console.log(data);
                  if (data.success) {
                    this.$message({
                      type: "success",
                      message: "删除成功"
                    });
                   this.tableDatas.splice(datas.$index, 1);
                  } else {
                    this.$message({
                      type: "info",
                      message: "删除失败"
                    });
                  }
                });
              })
    },
    //编辑按钮
    handleClicksss(data){
       this.$router.push({
          name: "taskAdd",
          params: {setId:data.row.id} //将需要修改行的id和组件类型传到新增数据页
        });
    },
    //查询按钮
    onSubmit() {
      const finData ={
        name:this.formInline.taskName,
        person:this.formInline.dutyPerson
      }
       httpService.request(api.toFind, finData, "post").then(res => {
        const data = httpService.parseResp(res);
        console.log(data.data);
        if (data.success) {
          this.tableDatas = data.data;
        }
      });
    },    
    //对样式进行修改
    rowstyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    headStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    }
  }
};
</script>

<style scoped>
.task-list {
  width: 100%;
  overflow: hidden;
}
.task-content {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
</style>