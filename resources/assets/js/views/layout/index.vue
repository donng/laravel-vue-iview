<template>
  <div class="main">

    <!-- sidebar start -->
    <div class="sidebar-menu-con" :style="{width: '200px', overflow: 'auto'}">
      <shrinkable-menu
          :open-names="openedSubmenuArr"
          :menu-list="menuList">
      </shrinkable-menu>
    </div>
    <!-- sidebar end -->

    <!-- header start -->
    <div class="main-header-con" :style="{paddingLeft: '200px'}">
      <div class="main-header">
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">

          <!--dropdown start -->
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="clickDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="userCenter">个人中心</DropdownItem>
                  <DropdownItem name="logout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
          <!-- dropdown end -->
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened></tags-page-opened>
      </div>
    </div>
    <!-- header end -->

    <!-- router-view start -->
    <div class="single-page-con" :style="{left: '200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <!-- router-view end -->

  </div>
</template>
<script>
  import shrinkableMenu from './components/shrinkable-menu/shrinkable-menu.vue';
  import tagsPageOpened from './components/tags-page-opened.vue';
  import breadcrumbNav from './components/breadcrumb-nav.vue';
  import messageTip from './components/message-tip.vue';
  import Cookies from 'js-cookie';
  import util from '@/libs/util.js';

  export default {
    components: {
      shrinkableMenu,
      tagsPageOpened,
      breadcrumbNav,
      messageTip,
    },
    data () {
      return {
        userName: '',
        openedSubmenuArr: this.$store.state.app.openedSubmenuArr
      };
    },
    computed: {
      menuList () {
        return this.$store.getters.routers;
      },
      pageTagsList () {
        return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
      },
      currentPath () {
        return this.$store.state.app.currentPath; // 当前面包屑数组
      },
      avatorPath () {
        return localStorage.avatorImgPath;
      },
      cachePage () {
        return this.$store.state.app.cachePage;
      },
      lang () {
        return this.$store.state.app.lang;
      },
      mesCount () {
        return this.$store.state.app.messageCount;
      }
    },
    methods: {
      init () {
        this.userName = this.$store.getters.user.name;

        let messageCount = 3;
        this.messageCount = messageCount.toString();
      },
      toggleClick () {
        this.shrink = !this.shrink;
      },
      clickDropdown (name) {
        if (name === 'userCenter') {
          // 用户中心
          util.openNewPage(this, 'ownspace_index');
          this.$router.push({
            name: 'ownspace_index'
          });
        } else if (name === 'logout') {
          // 退出登录
          this.$store.dispatch('logout').then(() => this.$router.push('login'));
          //this.$store.commit('clearOpenedSubmenu');
        }
      },
      checkTag (name) {
        let openpageHasTag = this.pageTagsList.some(item => {
          if (item.name === name) {
            return true;
          }
        });
        if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
        }
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
