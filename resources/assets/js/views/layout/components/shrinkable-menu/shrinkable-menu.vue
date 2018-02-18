<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
        v-show="!shrink"
        :menu-theme="theme"
        :menu-list="menuList"
        :open-names="openNames"
        @on-change="handleChange"
    ></sidebar-menu>
    <!--<sidebar-menu-shrink-->
        <!--v-show="shrink"-->
        <!--:menu-theme="theme"-->
        <!--:menu-list="menuList"-->
        <!--:icon-color="shrinkIconColor"-->
        <!--@on-change="handleChange"-->
    <!--&gt;</sidebar-menu-shrink>-->
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
      theme: {
        type: String,
        default: 'dark',
        validator (val) {
          return util.oneOf(val, ['dark', 'light']);
        }
      },
      beforePush: {
        type: Function
      },
      openNames: {
        type: Array
      }
    },
    computed: {
      bgColor () {
        return this.theme === 'dark' ? '#495060' : '#fff';
      },
      shrinkIconColor () {
        return this.theme === 'dark' ? '#fff' : '#495060';
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
  .ivu-shrinkable-menu {
    height: 100%;
    width: 100%;
  }
</style>

