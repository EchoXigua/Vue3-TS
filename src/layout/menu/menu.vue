<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="selectedKeys"
      :open-keys="true ?openKeys: []"
      :mode="true ? 'inline' : 'horizontal'"
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name || item.fullPath">
        <!-- <MenuItem :menu-info="item"></MenuItem> -->
        {{item.name}}--{{item.fullPath}}
      </template>
      <!-- <Menu.SubMenu
      key="sub1"
      >
        <Menu.ItemGroup key="g1">
          <Menu.Item key="mail">
            Navigation One
          </Menu.Item>
          <Menu.Item key="app">
            Navigation Two
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu> -->
   

    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive, computed } from 'vue';
import Menu from 'ant-design-vue/lib/menu'; // 加载 JS
import 'ant-design-vue/lib/menu/style/css';// 加载 CSS
import MenuItem from './menu-item.vue'; 
// import type { MenuTheme } from 'ant-design-vue'

import { userUserStore } from '@/store/modules/user';  //仓库里面的user数据


const userStore = userUserStore()
console.log('store',userStore.menus);


const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [] as string[]
})
const menus = computed(()=>{
  return [...userStore.menus]
})
console.log('menus',menus);

//侧边栏布局
const isSideMenu =  computed(()=> true)

const clickMenuItem = ({key}) =>{
  console.log('点击菜单',key);
  
}
const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
</script>

<style scoped>

</style>