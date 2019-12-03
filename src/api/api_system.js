import {
    request
  } from './axios-cm.js';

export const api = {
  'logstashGetall': '/logstash/getAll',//获得一栏数据的接口
  'Add':'/filebeat/add', //新增接口
  'Undate':'/filebeat/update',//需要修改的数据接口
  'logstashUndate':'/logstash/update',//logstash需要修改的数据接口
  'Get':'/filebeat/get',// fileBeatList获取需要修改的数据接口
  'logstashGet':'/logstash/get',// fileBeatList获取需要修改的数据接口
  'Delet':'/filebeat/delete', // fileBeatList获取需要修改的数据接口
  'logstashDelet':'/logstash/delete', // logstash获取需要修改的数据接口
  'getAll':'/filebeat/getAll',// fileBeatList获取表格一览数据接口
  'LogstashGetall':'/logstash/getAll',//获取logstash的一览接口
  'LogstashAdd':'/logstash/add',//获取logstash的一览接口
  'conmmonGetAll':'/common/getAll',//获取公共的一览接口
  'conmmonLogstashConfig':'/component/addLogstash',//配置组件logstash
  'conmmonKafkahConfig':'/component/addKafka',//配置组件kafka/component/addEs
  'conmmonEsConfig':'/component/addEs',//配置组件kafka/component/addEs/component/getAll
  'componentGetAll':'/component/getAll',//getall/component/addEs/component/getAll/component/delete
  'componentDelete':'/component/delete',//delet  platform/getAll
  'platformtgetAll':'/platform/getAll',//delet   /component/updateLogstash
  'componentUpdateLogstash':'/component/updateLogstash', //配置文件logstash的更新
  'componentUpdateKafka':'/component/updateKafka', //配置文件kafka的更新
  'componentUpdateEs':'/component/updateEs', //配置文件es的更新
  'getLogstash':'/component/getLogstash', //配置文件getLogstash的更新
  'getEs':'/component/getEs', //配置文件es的更新
  'getKafka':'/component/getKafka', //配置文件kafka的更新


//  大数据平台一览模块
  'platformgetAll':'/platform/getAll',//大数据平台一览getALL
  'platformUpdate':'/platform/update',//对大数据的更新
  'platformAdd':'/platform/add',//对大数据的添加
  'platformDelete':'/platform/delete',//对大数据的删除
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //获取logstash地址的接口
   'getLogstashall':'/component/getAllLogstash',//对大数据的删除/component/getAllEs
   //获取es地址的接口
   'getEsall':'/component/getAllEs',
   //获取es地址的接口
   'getKafkaall':'/component/getAllKafka',

 
    //任务模块

   'taskAdd':'/task/add', // 任务新增
   'getallFileB':'/filebeat/getAll', //获取filebeat的所有配置
   'getallLogstash':'/logstash/getAll', //获取logstash的所有配置
   'taskGetAll':'/task/getAll', //获取到总的数据
   'taskDelete':'/task/delete',//删除接口/task/getAllByOptions
   'toFind':'/task/getAllByOptions',//模糊查询
   'taskToFet':'/task/get',//根据id获取到需要修改的数据进行页面还原
   'taskUpdate':'/task/update',//数据刚更新

  //  ////////子任务模块
  'subtaskadd':'/task/addSub', //字模块新增
  'getSubAll':'/task/getAllSubByOptions',//子任务模糊插叙
  'subTaskDelete':'/task/deleteSub',//子任务列表删除数据时的接口
  'taskGetSubs':'/task/getSub', //获取到要修改的接口
  'updateSub':'/task/updateSub',//更新数据时的接口
  'taskGetAllSub':'/task/getAllSubByTaskId',//获取所有子任务
  'downLoadFilebeat':'/common/downloadFilebeat',//下载filebeat
  'downLoadLogstash':'/common/downloadLogstash',//下载logstash
  'login':'/user/login',//登录
  'loginOut':'/user/logout',//注销
  'preview':'/common/viewFilebeat',//file预览
  'previewLog':'/common/viewLogstash',//log预览

  //远程连接配置
  'remoteAdd':'/remote/add',//远程添加
  'remoteDelete':'/remote/delete',//远程删除
  'remoteGet':'/remote/get',//根据主键获取需要修改的数据
  'remoteGetAll':'/remote/getAll',//获取远程总数据
  'remoteUpdate':'/remote/update',//远程更新
  
  



  
  
  
  
  



   
   

   

  


  

}





