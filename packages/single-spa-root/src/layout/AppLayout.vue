<template>
  <Layout class="layout">
    <LayoutHeader class="layout-header">
      <Space size="small" class="navbar-logo">
        <img src="https://zh-hans.single-spa.js.org/img/logo-white-bgblue.svg" alt="">
        <TypographyTitle :heading="4" style="margin: 0;">single-spa</TypographyTitle>
      </Space>
      <TypographyText code>当前渲染的子应用框架为: {{ state.value.frame }}</TypographyText>
      <TypographyText code>子应用框架版本: v{{ state.value.frameVersion }}</TypographyText>
    </LayoutHeader>
    <Layout class="center-layout">
      <LayoutSider
        collapsible
        :collapsed="collapsed"
      >
        <Menu
          class="sider-menu"
          v-model:selectedKeys="selectedKeys"
        >
          <MenuItem
            v-for="item in menus"
            :key="item.path"
            @click="toApp(item.path)"
          >
            <template #icon>
              <component :is="item.iconCmp" />
            </template>
            {{ item.appName }}
          </MenuItem>
        </Menu>
        <template #trigger="{ collapsed }">
          <div class="collapse-button" @click="onCollapse">
            <component
              :is="collapsed ? IconMenuUnfold : IconMenuFold"
            />
          </div>
        </template>
      </LayoutSider>
      <LayoutContent class="content">
        <div id="single-spa-app1"/>
        <div id="single-spa-app2"/>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref, Ref, watch } from "vue"
  import { useRouter, useRoute } from 'vue-router'
  import {
    Layout, LayoutHeader, LayoutSider, LayoutContent, Menu, MenuItem, Space, TypographyTitle,
    TypographyText,
  } from '@arco-design/web-vue'
  import {
    IconCodeBlock, IconCode, IconMenuFold, IconMenuUnfold,
  } from '@arco-design/web-vue/es/icon'

  // vue 3.3 新特性
  defineOptions({
    name: 'AppLayout',
  })
  defineProps<{
    state: Ref<{ frame:string; frameVersion:string }>
  }>()

  const router = useRouter()
  const route = useRoute()

  const collapsed = ref(false)
  const selectedKeys = ref<string[]>([])
  const menus = [
    {
      path: '/app1',
      appName: '子应用app1',
      iconCmp: IconCode,
    },
    {
      path: '/app2',
      appName: '子应用app2',
      iconCmp: IconCodeBlock,
    },
  ]
  function onCollapse() {
    collapsed.value = !collapsed.value
  }
  function toApp(path:string) {
    router.push(path)
  }

  watch(route, r => {
    const path = ['/app1', '/app2'].find(p => r.path.startsWith(p))
    if (!path) return
    selectedKeys.value = [path]
  }, {
    immediate: true,
  })
</script>

<style lang="less" scoped>
:root div {
  box-sizing: border-box;
}
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  &-header {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    column-gap: 8px;
    .navbar-logo {
      min-width: 200px;
      padding: 5px 12px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .center-layout {
    height: calc(100vh - 50px);
    :deep(.arco-layout-sider-light) {
      box-shadow: 0 5px 5px 0 rgba(0,0,0,.08);
    }
    .sider-menu {
      height: calc(100% - 56px);
    }
    .collapse-button {
      position: absolute;
      right: 12px;
      bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--border-radius-small);
      cursor: pointer;
      color: var(--color-text-3);
      background-color: var(--color-fill-1);
      &:hover {
        background-color: var(--color-fill-3);
      }
    }
    .content {
      padding: 16px;
    }
  }
}
#single-spa-app1, #single-spa-app2 {
  height: 100%;
  display: none;
}
</style>
