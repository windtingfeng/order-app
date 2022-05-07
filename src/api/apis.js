import axios from "axios";

//设置请求前缀地址
axios.defaults.baseURL = "http://127.0.0.1:5000"

//获取商品数据接口
export const getgoods = () => axios.get('/goods/goods_list')

//获取商家接口
export const getshop = () => axios.get('/shop/seller')

//获取评价数据接口
export const getratings = () => axios.get('/shop/ratings')