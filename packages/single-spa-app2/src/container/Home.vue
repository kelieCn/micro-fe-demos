<template>
  <div class="Home">
    <Calendar v-model="value" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { Calendar, Message } from '@arco-design/web-vue'

  const value = ref(new Date())

  function onChange() {
    Message.success('Calendar 组件 onChange 事件触发')
  }
</script>

<style lang="less" scoped></style>
