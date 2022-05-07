<template>
  <div class="rating-box">
    <div class="rating-top-box">
      <div class="rating-left">
        <p>5.0</p>
        <p>综合评分</p>
        <p>高于周边商家96%</p>
      </div>
      <div class="rating-right">
        <span>服务态度：</span><van-rate v-model="value" allow-half color="#ffd21e" ></van-rate>
        <span>菜品质量：</span><van-rate v-model="value" allow-half color="#ffd21e" ></van-rate>
        <div>
          <span>送达时间：</span><span>20分钟</span>
        </div>
      </div>
    </div>
    <!-- 灰色间隔区域 -->
    <div class="rating-center"></div>

    <!-- 评论区 -->
    <div class="rating-content-checkbox">
        <p :class="{checked:checkbox == 0}" @click="check(0)">全部{{ ratingsnum.length }}</p>
        <p :class="{checked:checkbox == 1}" @click="check(1)">满意{{ good.length }}</p>
        <p :class="{checked:checkbox == 2}" @click="check(2)">不满意{{ bad.length }}</p>
    </div>
    <div class="rating-content">
      <div class="rating-content-item" v-for="(item,index) in ratings" :key="index">
        <div class="ratingcontent">
          <div class="ratingcontent-left">
            <img :src="item.avatar" alt="" style="width:60%;overflow:hidden;border-radius:50px">
          </div>
          <div class="ratingcontent-right">
            <div>
              <p>{{ item.username }}</p>
              <p>{{ item.rateTime }}</p>
            </div>
            <div>
              <van-rate v-model="item.score" allow-half color="#ffd21e" ></van-rate>
            </div>
            <p>
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Rate } from 'vant'
import { getratings } from '../api/apis'
import { formatDate } from '../utils/index'
export default {
  data(){
    return{
      value:4.5,
      ratings:[],
      checkbox:0,
      ratingsnum:[]
    }
  },
  async created(){
    let ratings = await getratings()
    console.log(ratings);
    this.ratings = ratings.data.data
    this.ratingsnum = ratings.data.data
    for(let obj of this.ratings){
      obj.rateTime = formatDate(obj.rateTime)
    }
  },
  components:{
    [Rate.name]:Rate
  },
  computed:{
    good(){
      return this.ratingsnum.filter((obj)=>{
        return obj.score >= 3
      })
    },
    bad(){
      return this.ratingsnum.filter((obj)=>{
        return obj.score < 3
      })
    }
  },
  methods:{
    async check(num){
      this.checkbox = num
      let ratings = await getratings()
      switch(num){
        case 0:
          this.ratings = ratings.data.data
          for(let obj of this.ratings){
            obj.rateTime = formatDate(obj.rateTime)
          }
          break;
        case 1:
          this.ratings = ratings.data.data.filter((obj)=>{
            return obj.score >= 3
          })
          for(let obj of this.ratings){
            obj.rateTime = formatDate(obj.rateTime)
          }
          break;
        case 2:
          this.ratings = ratings.data.data.filter((obj)=>{
            return obj.score < 3
          })
          for(let obj of this.ratings){
            obj.rateTime = formatDate(obj.rateTime)
          }
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.checked{
  background-color: rgb(250, 171, 67);
}


.rating-box{
  width: 100%;
  flex: 1;
  overflow: hidden;
}
.rating-top-box{
  display: flex;
  width: 100%;
  padding: 10px;
  .rating-left{
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-right: 1px solid #ccc;
  }
  .rating-left p:nth-child(1){
    color: rgb(250, 195, 76);
    font-size: 28px;
    font-weight: 600;
  }
  .rating-left p:nth-child(2){
    font-size: 18px;
    font-weight: 600;
  }
  .rating-left p:nth-child(3){
    font-size: 14px;
    color: #ccc;
  }
  .rating-right{
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}


  //间隔区域
  .rating-center{
    height: 30px;
    width: 100%;
    background-color: rgb(238, 238, 238);
  }

  //评论区
  .rating-content-checkbox{
      background-color: white;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      z-index: 999;
      display: flex;
      justify-content: space-between;
      p{
        width: 33%;
        border: 1px solid rgb(255, 191, 54);
        padding: 5px;
        text-align: center;
      }
    }
  .rating-content{
    width: 100%;
    height: 70%;
    padding: 10PX;
    box-sizing: border-box;
    overflow: scroll;

    //评论列表
    .rating-content-item{
      display: flex;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid rgb(231, 231, 231);
      .ratingcontent{
        display: flex;
        width: 100%;
        .ratingcontent-left{
          width: 20%;
        }
        .ratingcontent-right{
          width: 80%;
          div{
            margin: 5px 0px;
          }
          div:nth-child(1){
            display: flex;
            justify-content: space-between;
          }
          div:nth-child(2){
            width: 50%;
          }
        }
      }
    }
  }
</style>