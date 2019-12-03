import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [
          {
            path: '/login',
            name: 'login',
            component: () =>import ('../views/Login/login'),
          },
           { 
            path: '/',
            name: 'Index',
            component: () =>
                import ('../views/index.vue'),
            children: [{
                    path: '/filebeat',
                    name:'filebeat',
                    component: () =>
                        import ('../views/collectPlatForm/filebeat.vue'),
                },
                {
                    path: '/logstash',
                    name:'logstash',
                    component: () =>
                        import ('../views/collectPlatForm/logstash.vue'),
                },
                {
                    path: '/subTaskAdd',
                    name:'subTaskAdd',
                    component: () =>
                        import ('../views/taskConfig/subTaskAdd'),
                },
                {
                    path: '/subTaskList',
                    name:'subTaskList',
                    component: () =>
                        import ('../views/taskConfig/subTaskList'),
                },
                {
                    path: '/filebeatList',
                    name:'filebeatList',
                    component: () =>
                        import ('../views/collectPlatForm/filebeatList.vue'),
                },
                {
                    path: '/esConfig',
                    name:'esConfig',
                    component: () =>
                        import ('../views/compConfig/esConfig'),
                },
                {
                    path: '/kafkaConfig',
                    name:'kafkaConfig',
                    component: () =>
                        import ('../views/compConfig/kafkaConfig'),
                },
                {
                    path: '/logstashConfig',
                    name:'logstashConfig',
                    component: () =>
                        import ('../views/compConfig/logstashConfig'),
                },
                {
                    path: '/configList',
                    name:'configList',
                    component: () =>
                        import ('../views/compConfig/configList'),
                },
                {
                    path: '/dataplatform',
                    name:'dataplatform',
                    component: () =>
                        import ('../views/compConfig/dataplatform'),
                },
                {
                    path: '/taskAdd',
                    name:'taskAdd',
                    component: () =>
                        import ('../views/taskConfig/taskAdd'),
                },
                {
                    path: '/taskList',
                    name:'taskList',
                    component: () =>
                        import ('../views/taskConfig/taskList'),
                },
                {
                    path: '/connectConfig',
                    name:'connectConfig',
                    component: () =>
                        import ('../views/connectAdmin/connectConfig'),
                },
                {
                    path: '/connectList',
                    name:'connectList',
                    component: () =>
                        import ('../views/connectAdmin/connectList'),
                },
            ],
            redirect: '/dataplatform'
        }
    ]
})
