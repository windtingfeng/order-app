<template>
  <div class="shop-box">
    <div class="shop-top">
        <div class="shop-top-header">
          <div>
            <p class="shop-top-name">{{ shopinfo.name }}</p>
            <van-rate v-model="value" allow-half color="#ffd21e" class="shop-top-vant"></van-rate>
            <span>  月售{{ shopinfo.sellCount }}单</span>
          </div>
          <div>
            收藏
          </div>
        </div>

        <div class="shop-top-bottom">
          <div>
            <p>起送价</p>
            <p>{{ shopinfo.minPrice }}元</p>
          </div>
          <div>
            <p>商家配送</p>
            <p>{{ shopinfo.deliveryPrice }}元</p>
          </div>
          <div>
            <p>平均配送时间</p>
            <p>{{ shopinfo.deliveryTime }}分钟</p>
          </div>
        </div>
    </div>
      
    <!-- 灰色间隔区域 -->
    <div class="rating-center"></div>

    <!-- 内容区域 -->
    <div class="shopinfo">
      <h3>活动与公告</h3>
      <p>{{ shopinfo.bulletin }}</p>
    </div>
  </div>
</template>

<script>
import { getshop } from '../api/apis'
import { Rate } from 'vant'
export default {
  name:'shop',
  data(){
    return{
      shopinfo:{},
      value:4.5
    }
  },
  async created(){
    let shop = await getshop()
    this.shopinfo = shop.data.data
    console.log(this.shopinfo);
  },
  components:{
    [Rate.name]:Rate
  }
}
</script>

<style lang="less" scoped>
.shop-box{
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  overflow: scroll;
  .shop-top{
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
  }
  .shop-top-header{
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid rgb(168, 166, 166);
      display: flex;
      justify-content: space-between;
      .shop-top-name{
        margin: 5px 0px;
        font-size: 22px;
      }
      .shop-top-vant{
        margin: 5px 0px;
      }
  }
  .shop-top-bottom{
    display: flex;
    justify-content:space-around;
    padding: 10px;
  }

  //间隔区域
  .rating-center{
    height: 30px;
    width: 100%;
    background-color: rgb(238, 238, 238);
  }
  //内容区域
  .shopinfo{
    padding: 10px;
    p{
      margin: 10px 0px;
      color: red;
    }
  }
}
</style>