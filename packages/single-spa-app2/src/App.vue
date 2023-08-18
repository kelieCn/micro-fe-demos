<template>
  <Card :bordered="false" class="app2-container">
    <Tabs
      v-model:active-key="activeKey"
      @change="onChangeTab"
    >
      <TabPane title="页面1" key="Home" />
      <TabPane title="页面2" key="About" />
    </Tabs>
    <RouterView #default="{ Component, route }">
      {{ setActiveKey(route) }}
      <component :is="Component" />
    </RouterView>
  </Card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Card, Tabs, TabPane } from '@arco-design/web-vue'

  const router = useRouter()
  const activeKey = ref<string>('Home')

  function setActiveKey(route:any) {
    activeKey.value = route.name
  }
  function onChangeTab(key:any) {
    router.push({ name: key })
  }
</script>

<style scoped lang="less">
.app2-container {
  border-radius: 4px;
}
</style>
