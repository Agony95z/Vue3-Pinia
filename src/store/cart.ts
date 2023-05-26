import { defineStore } from "pinia"
import { buyProducts, IProduct } from "../api/shop"

// 跨容器模块
import {useProductsStore} from "./products"
// Omit 过滤
// Pick 挑选 Pick<IProduct, 'inventory'> // 取inventory
// 测试直接提交
// &合并
type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[], // 购物车商品列表
      checkoutStatus: null as null | string,
    }
  },
  getters: {
    totalPrice (state) {
      return state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },
  actions: {
    addProductToCart(product: IProduct) {
      // 看商品有没有库存
      if (product.inventory < 1) {
        return
      }
      // 检查购物车是否有该商品
      const cartItem = this.cartProducts.find(item => item.id === product.id)
      if (cartItem) {
        // 如果有则让商品数量+1
        cartItem.quantity++
      } else {
        // 如果没有则添加到购物车中
        this.cartProducts.push({
          id: product.id,
          quantity:1, // 第一次加入购物车数量1 再次添加走if ++
          title: product.title,
          price: product.price,
        })
      }
      // 更新商品库存
      const productStore = useProductsStore()
      productStore.decrementProduct(product)
    }, 
    async checkout () {
      const ret = await buyProducts()
      this.checkoutStatus = ret ? '成功' : '失败'
      if (ret) {
        this.cartProducts = []
      }
    }

  }
})