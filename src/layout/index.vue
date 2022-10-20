<template>
<Layout>
	<Layout.Sider
		v-model:collapsed="collapsed"
    collapsible
	>
	<div class="logo" />
	<AsideMenu></AsideMenu>
	</Layout.Sider>
</Layout>
123132
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Layout from 'ant-design-vue/lib/layout'; // 加载 JS
import 'ant-design-vue/lib/date-picker/style/css'; // 加载 CSS
import AsideMenu from './menu/menu.vue'

const collapsed = ref<boolean>(true)
const selectedKeys = ref<string[]>(['1'])

</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>