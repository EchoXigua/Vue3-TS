<template>
  <i18n-t tag="span" :keypath="getTitle" scope="global" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {PropType} from 'vue'
import { useLocaleStore } from '@/store/modules/locale';


const props = defineProps({
  title: {
    type: [String,Object] as PropType<string | Title18n>
  }
})

const localeStore = useLocaleStore();


const getTitle = computed(()=>{
  const { title = '' } = props;
  console.log('title',title);
  if (typeof title === 'object') {
      return title?.[localeStore.locale] ?? title;
    }
    return title;
  })
</script>

<style scoped>

</style>