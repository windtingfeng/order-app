import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'order',
            component:()=> import('../views/Orderinfo')
        },
        {
            path:'/rating',
            name:'rating',
            component:()=> import('../views/Rating')
        },
        {
            path:'/shops',
            name:'shops',
            component:()=> import('../views/Shops')
        }
    ]
})