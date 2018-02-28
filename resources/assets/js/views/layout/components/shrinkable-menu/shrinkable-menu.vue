<template>
  <!-- 设置左侧导航栏背色 -->
  <div class="menu">
    <slot name="top"></slot>
    <sidebar-menu
        v-show="!shrink"
        :menu-list="menuList"
        :open-names="openNames"
        @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
        v-show="shrink"
        :menu-list="menuList"
        @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
  import sidebarMenu from './components/sidebarMenu.vue';
  import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
  import util from '@/libs/util';

  export default {
    name: 'shrinkableMenu',
    components: {
      sidebarMenu,
      sidebarMenuShrink
    },
    props: {
      shrink: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        required: true
      },
      beforePush: {
        type: Function
      },
      openNames: {
        type: Array
      }
    },
    methods: {
      // name 是路由名，此方法为子组件 emit 的方法
      handleChange (name) {
        let willpush = true;
        if (this.beforePush !== undefined) {
          if (!this.beforePush(name)) {
            willpush = false;
          }
        }
        // 路由跳转
        if (willpush) {
          this.$router.push({
            name: name
          });
        }
        this.$emit('on-change', name);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu {
    width: 100%;
    height: 100%;
    background-color: #495060;
  }
</style>

