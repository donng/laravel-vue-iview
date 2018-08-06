<template>
  <!-- active-name: 激活菜单的name -->
  <!-- open-names: 展开的 Submenu 的 name 集合 -->
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" theme="dark" width="auto" @on-select="changeMenu">
    <!-- 属性不为隐藏且存在孩子节点 -->
    <template v-for="item in menuList" v-if="!item.hidden && item.children">
      <!-- menu-item 没有子页面 -->
      <MenuItem v-if="item.children.length === 1 && !item.showParent" :name="item.children[0].name" :key="'menuitem' + item.name">
        <Icon v-if="item.children[0].meta && item.children[0].meta.icon" :type="item.children[0].meta.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
        <span v-if="item.children[0].meta && item.children[0].meta.title" :key="'title' + item.name">{{ item.children[0].meta.title }}</span>
      </MenuItem>
      <!-- submenu 有子页面 -->
      <Submenu v-else :name="item.name" :key="item.name">
        <template slot="title">
          <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" :size="iconSize"></Icon>
          <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="'menuitem' + child.name">
            <Icon v-if="child.meta && child.meta.icon" :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
            <span v-if="child.meta && child.meta.title" :key="'title' + child.name">{{ child.meta.title }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    name: 'sidebarMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      openNames: {
        type: Array
      }
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active);
      },
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      }
    },
    updated () {
      this.$nextTick(() => {
        if (this.$refs.sideMenu) {
          this.$refs.sideMenu.updateOpened();
        }
      });
    },
    created() {

    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layout-text {
    height: 25px;
    display: inline-block;
    white-space: nowrap;
    position: absolute;
  }
</style>
