<template>
  <div id="main-box">
    <!-- 商家信息 -->
    <div class="header">
      <div class="header-img">
        <img :src="avatar" width="100px" />
      </div>
      <div>
        <p class="shopname">{{ name }}</p>
        <p class="shopdescription">
          <span>{{ description }}</span
          ><span> / {{ deliveryTime }}分钟送达</span>
        </p>
        <span
          class="shopsupports"
          v-for="(item, index) in supports"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="checkbox">
      <router-link to="/">商品</router-link>
      <router-link to="/rating">评价</router-link>
      <router-link to="/shops">商家</router-link>
    </div>
    <!-- 主要内容展示区域 -->
    <router-view></router-view>
    <!-- 购物车 -->
    <div class="carbox" @click="showcar == 0 ? (showcar = 1) : (showcar = 0)">
      <div class="car-contact">
        <img src="../assets/smile.png" alt="" />
        <p>联系商家</p>
      </div>
      <div class="car-price">
        <img src="../assets/searchcart.png" alt="" />
        <div>
          <p style="color:red;font-size:18px">￥{{ getPrice }}</p>
        </div>
      </div>
    </div>

    <!-- 购物车详情页 -->
    <transition name="slide-fade">
      <div v-show="showcar == 0" class="carinfo">
        <div class="carinfotit">
          <span>购物车</span>
          <span>清空购物车</span>
        </div>
        <div
          :class="{ carhidden: (item.num == 0) }"
          v-for="item in getShopCar"
          :key="item.id"
          class="shopcarlist"
        >
          <div class="texthidden">{{ item.name }}</div>
          <span>￥{{ item.price }}</span>
          <img src="../assets/minus-circle.png" alt="" width="30px" @click="changenum(-1,item.id)" />
          <span>{{ item.num }}</span>
          <img src="../assets/add-circle.png" alt="" width="30px" @click="changenum(1,item.id)" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getshop } from "../api/apis";
export default {
  name: "order",
  data() {
    return {
      avatar: "",
      name: "",
      description: "",
      supports: [],
      deliveryTime: 0,
      showcar: 0,
      shopcar: [],
    };
  },
  async created() {
    let shop = await getshop();
    this.avatar = shop.data.data.avatar;
    this.name = shop.data.data.name;
    this.description = shop.data.data.description;
    this.deliveryTime = shop.data.data.deliveryTime;
    this.supports = shop.data.data.supports;
  },
  mounted(){
  },
  computed: {
    getPrice() {
      let pri = this.$store.getters.getcarfoods
      let total = 0
      for(let obj of pri){
        let price = Number(obj.price) * Number(obj.num)
        total += price 
      }
      return total.toFixed(2)
    },
    getShopCar(){
      return this.$store.getters.getcarfoods
    }
  },
  methods: {
    changenum(num,id){
      this.$store.commit('addfoods',{num,id})
    }
  },
};
</script>

<style lang="less">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.texthidden {
  width: 150px;
  display: block;
  white-space: nowrap;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
}

.carhidden {
  display: none;
}

#main-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    background-color: antiquewhite;
    height: 200px;
    display: flex;
    align-items: center;
    .header-img {
      margin: 0px 20px;
    }
    .shopname {
      font-size: 18px;
      font-weight: 600;
    }
    .shopdescription {
      font-size: 16px;
    }
    .shopsupports {
      font-size: 12px;
    }
  }
  .checkbox {
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
  }
  .carbox {
    width: 100%;
    height: 70px;
    border-radius: 50px;
    background-color: black;
    position: fixed;
    z-index: 999;
    bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    .car-contact {
      width: 22%;
      height: 100%;
      border-right: 2px solid white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      p {
        color: white;
        font-size: 12px;
      }
      img {
        width: 35px;
      }
    }
    .car-price {
      display: flex;
      margin: 0px 10px;
      padding: 5px;
      width: 65%;
      line-height: 60px;
      img {
        width: 40px;
      }
    }
  }
  .carinfo {
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: white;
    position: fixed;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 40px 10px;
    box-sizing: border-box;
    .carinfotit {
      display: flex;
      justify-content: space-between;
    }
    .shopcarlist {
      display: flex;
      height: 30px;
      line-height: 30px;
      margin: 5px 0px;
      justify-content: space-between;
      span {
        color: red;
        font-weight: 600;
      }
    }
  }
}
</style>