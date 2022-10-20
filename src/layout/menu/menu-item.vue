<template>
  <!-- 目录 有子菜单的-->
    <template v-if="false">
      <Menu.SubMenu :key="props.menuInfo?.name">
        <template #title>
          {{props.menuInfo?.name}}
        </template>
      </Menu.SubMenu>
    </template>

    <!-- 没有子菜单 -->
    <template v-else>
      <Menu.Item :key="props.menuInfo?.name">
        <!-- 图标 -->
        <icon-font :type="props.menuInfo?.meta?.icon" />
        <!-- 标题 -->
        <TitleI18n :title="props.menuInfo?.meta?.title" />
      </Menu.Item>
    </template>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Menu from 'ant-design-vue/lib/menu'// 加载 JS
import 'ant-design-vue/lib/menu/style/css'; // 加载 CSS
import type { RouteRecordRaw } from 'vue-router';
import type {PropType} from 'vue'

//引入图标 左侧菜单的
import {IconFont} from '@/components/basic/iconfont'
//标题的组件 左侧菜单的
import { TitleI18n } from '@/components/basic/title-i18n';


const props = defineProps({
  menuInfo: {
    type:Object as PropType<RouteRecordRaw>
  }
})

const isShowSubMenu = ref(true)
console.log('收到的值',props);

</script>

<style scoped>

</style>