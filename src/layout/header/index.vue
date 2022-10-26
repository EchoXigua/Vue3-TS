<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    123
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import {
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    LockOutlined,
  } from '@ant-design/icons-vue';
import {
  Layout,
  message,
  Modal,
  Dropdown,
  Menu,
  Space,
  Breadcrumb,
  Avatar,
  Tooltip,
  type MenuTheme,
} from 'ant-design-vue';
  import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { computed,nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useThemeStore } from '@/store/modules/projectConfig'
import { useUserStore } from '@/store/modules/user';

//接受父组件传递的数据
defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>,
  }
})
//子给父传递数据
const emit = defineEmits(['update:collapsed'])
const themeStore = useThemeStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
//登录信息
const userInfo = computed(()=>userStore.userInfo)
//主题颜色的处理
const headerStyle = computed<CSSProperties>(() => {
  const { navTheme, layout } = themeStore
  const isDark = navTheme === 'dark' && layout === 'topmenu';

  return {
    backgroundColor: navTheme === 'realDark' || isDark ? '' : 'rgba(255, 255, 255, 0.85)',
    color: isDark ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})



</script>

<style lang="less" scoped>
  .layout-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    height: @header-height;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;

    * {
      cursor: pointer;
    }
  }
</style>