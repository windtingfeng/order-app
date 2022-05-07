import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        foodslist:[]
    },
    mutations:{
        //初始化商品值
        changefoodslist(state,list){
            state.foodslist = list
        },
        //购物车增加
        addfoods(state,parm){
            const { id,num } = parm
            for(let obj of state.foodslist){
                for(let pro of obj.foods){
                    if(pro.id == id){
                        Vue.set(pro,'num',pro.num+=num)
                        return
                    }
                }
            }
        }
    },
    getters:{
        getcarfoods(state){
            let foodarr = []
            for (let obj of state.foodslist) {
              for (let child of obj.foods) {
                if (child.num > 0) {
                  foodarr.push(child);
                }
              }
            }
            return foodarr
        }
    }
})