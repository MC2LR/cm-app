import axios from 'axios';

export const httpService = {
    // 发送ajax请求
    request: (url, data, method) => {
        if(method == 'get'){
            return axios.get(url, data);
        }else if(method == 'post'){
            return axios.post(url, data);
        }
    },
    // 解析报文
    parseResp: (resp) => {
        return resp.data.code === 0 ? {success: true, data: resp.data.data} : {success: false, msg: resp.data.msg};
    }

};
