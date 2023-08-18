<template>
  <List
    class="list-demo-action-layout"
    :bordered="false"
    :data="dataSource"
    :pagination-props="paginationProps"
  >
    <template #item="{ item }">
      <ListItem class="list-demo-item" action-layout="vertical">
        <template #actions>
          <span><IconHeart />83</span>
          <span><IconStar />{{ item.index }}</span>
          <span><IconMessage />Reply</span>
        </template>
        <template #extra>
          <div className="image-area">
            <img alt="arco-design" :src="item.imageSrc" />
          </div>
        </template>
        <ListItemMeta
          :title="item.title"
          :description="item.description"
        >
          <template #avatar>
            <Avatar shape="square">
              <img alt="avatar" :src="item.avatar" />
            </Avatar>
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { List, ListItem, ListItemMeta, Avatar } from '@arco-design/web-vue'
  import { IconHeart, IconStar, IconMessage } from '@arco-design/web-vue/es/icon'

  const baseUrl = import.meta.env.BASE_URL
  const names = ['Socrates', 'Balzac', 'Plato']
  const avatarSrc = [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const imageSrc = [
    `${baseUrl}picture1.jpg`,
    `${baseUrl}picture2.jpg`,
    `${baseUrl}picture3.jpg`,
  ];
  const dataSource = new Array(15).fill(null).map((_, index) => {
    return {
      index: index,
      avatar: avatarSrc[index % avatarSrc.length],
      title: names[index % names.length],
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
      imageSrc: imageSrc[index % imageSrc.length],
    }
  })
  const paginationProps = reactive({
    defaultPageSize: 3,
    total: dataSource.length
  })
</script>

<style scoped lang="less">
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
