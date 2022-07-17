<template>
  <div>
    <p>{{mainStore.count}}</p>
    <p>{{mainStore.arr}}</p>
    <p>{{mainStore.count10}}</p>
    <p>{{count}}</p>
    <p>{{foo}}</p>
    <button @click="handleChangeState">修改count</button>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia"
  import { useMainStore } from "../store"
  const mainStore = useMainStore()
  console.log(mainStore.count)
  // 这里是有问题的 因为这样拿到的数据不是响应式的
  // Pinia 其实是把state数据都做了reactive处理
  // const {count, foo} = mainStore

  // 解决方案 把解构出来的数据做 ref 响应式代理
  const {count, foo} = storeToRefs(mainStore)
  const handleChangeState = () => {

    // 方法一：最简单的方式就是这样
    // mainStore.count++

    // 方式二: 如果需要修改多个数据，建议使用$patch 批量更新
    // mainStore.$patch({
    //   count: mainStore.count + 1,
    //   foo: 'zs'
    // })
    
    // 方式三： $patch 一个函数
    // mainStore.$patch(state => {
    //   state.count++
    //   state.foo = 'sss'
    //   state.arr = state.arr.push(4)
    // })

    // 方式四 逻辑比较多的时候可以封装到 actions 里做处理
    mainStore.changeState()
  }
</script>

<style scoped>

</style>