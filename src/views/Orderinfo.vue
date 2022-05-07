<template>
  <div class="cont-box">
    <!-- 左侧滑动列表 -->
     <div class="cont-left">
       <div>
        <p :class="{leftGoods:true,selected: selected==index}" @click="checkfood(index)" v-for="(item,index) in goodsList" :key="index">{{ item.name }}</p>
       </div>
     </div>
    <!-- 右侧滑动列表 -->
     <div class="cont-right">
       <div>
        <div :class="'food'+index" v-for="(item,index) in goodsList" :key="index">
          <p class="goodsname">{{ item.name }}</p>
          <div v-for="food in item.foods" :key="food.id" class="right-food">
            <div>
              <img :src="food.imgUrl" alt="" width="90px">
            </div>
            <div class="foodbox">
              <p class="foodname">{{ food.name }}</p>
              <p class="foodsellCount">月售{{ food.sellCount }}份 好评度{{ food.rating }}%</p>
              <div class="foodbtn">
                <p class="foodprice">￥{{ food.price }}</p>
                <img v-show="food.num>0" src="../assets/minus-circle.png" alt="" width="30px" @click="addfood(-1,food.id)" />
                <span>{{ food.num }}</span>
                <img src="../assets/add-circle.png" alt="" width="30px" @click="addfood(1,food.id)" />
              </div>
            </div>
          </div>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
import { getgoods } from '../api/apis'
import BScroll from 'better-scroll'
export default {
  name:'orderinfo',
  data(){
    return{
      foods:[],
      selected:0,
    }
  },
  async created(){
    let goods = await getgoods()
    let arr = goods.data.goodsList
    for(let obj of arr){
      for(let child of obj.foods){
        child.num = 0
      }
    }
    this.$store.commit('changefoodslist',arr)
  },
  mounted(){
      this.scrollleft = new BScroll('.cont-left',{
        click: true //允许滚动面板点击
      })
      this.scrollright = new BScroll('.cont-right',{
        click: true, //允许滚动面板点击
        probeType: 3 //实时派发滚动事件
      })

      this.scrollright.on('scroll',(pos) =>{
        let y = Math.abs(pos.y)
        for(let obj of this.getHeight){
          if(y>=obj.startY&&y<obj.endY){
            this.selected = obj.index
            break
          }
        }
      })
  },
  methods:{
    //添加购物车
    addfood(num,id){
      this.$store.commit('addfoods',{num,id})
    },
    //点击左侧选项卡
    checkfood(index){
      this.selected = index
      this.scrollright.scrollToElement(`.food${index}`,600)
    }
  },
  computed:{
    //获取当前dom高度和起始高度
    getHeight(){
      let arr=[]
      let total=0
      for(let i=0;i<this.goodsList.length;i++){
        let dom = document.querySelector(`.food${i}`).clientHeight
        arr.push({startY:total,endY:total+dom,index:i})
        total += dom
      }
      return arr
    },
    goodsList(){
      return this.$store.state.foodslist
    }
  }
}
</script>

<style lang="less">
  .selected{
    background: bisque;
  }
  .cont-box{
    flex: 1;
    display: flex;
    overflow: hidden;
    .cont-left{
      width: 100px;
      height: 100%;
      background-color: #ccc;
      overflow: scroll;
      p{
        padding: 30px 5px;
      }
    }
    .cont-right{
      width: 100%;
      flex: 1;
      overflow: scroll;
      .goodsname{
        padding: 5px 10px;
        color: rgb(133, 131, 131);
        background-color: rgb(228, 227, 227);
      }
      .right-food{
        display: flex;
        padding: 10px;
        img{
          border-radius: 10px;
        }
        .foodbox{
          width: 100%;
        }
        .foodname{
          font-size: 14px;
          margin: 5px 5px;
          font-weight: 600;
          height: 40px;
        }
        .foodsellCount{
          font-size: 8px;
          margin: 5px 5px;
          color: #d3d0d0;
        }
        .foodbtn{
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
        }
        .foodprice{
          color: red;
          font-size: 14px;
          margin: 5px 5px;
          font-weight: 600;
        }
      }
    }
  }
</style>