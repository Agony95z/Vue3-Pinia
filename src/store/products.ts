
import {defineStore} from 'pinia'
import {getProducts, IProduct} from '../api/shop'
/**
 * @name: zhangweihai
 * @msg: 
 * @return {*}
 */
export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      all: [] as IProduct[], // 所有商品列表
    }
  },
  getters: {},
  actions: {
    async loadAllProduct() {
      const ret = await getProducts()
      this.all = ret
    },
    // 减库存
    decrementProduct(product: IProduct) {
      const ret = this.all.find(item => item.id === product.id)
      if (ret) {
        ret.inventory--
      }
    }
  }
})