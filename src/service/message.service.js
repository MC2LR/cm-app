import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export const message = {
    // 发送ajax请求
    success: function(types,messages){
        this.$message({
            type: types,
            message: messages
      });
    },


};