<style lang="less">
  @import '../main.less';
</style>

<template>
  <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">

    <div class="close-all-tag-con">
      <Dropdown transfer @on-click="clearTags">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <transition-group name="taglist-moving-animation">
        <Tag
            type="dot"
            v-for="(item, index) in tags"
            ref="tagsPageOpened"
            :key="item.name"
            :name="item.name"
            @click.native="linkTo(item)"
            :closable="item.name === 'home' ? false : true"
            :color="color(item)"
        >{{ itemTitle(item) }}
        </Tag>
      </transition-group>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import VueI18n from 'vue-i18n';

  Vue.use(VueI18n);
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        tagBodyLeft: 0,
        refsTag: [],
        tagsCount: 1
      };
    },
    computed: {
      currentPageName () {
        return this.$route.name;
      },
      tags () {
        return this.$store.state.app.tags;
      }
    },
    watch: {
      $route() {
        this.appendTag();
      },
    },
    methods: {
      appendTag () {
        if (this.$route.name && this.$route.meta && this.$route.meta.title) {
          this.$store.dispatch('appendTag', this.$route);
        }
      },
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      },
      closePage (event, name) {
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        let lastPageObj = pageOpenedList[0];
        if (this.currentPageName === name) {
          let len = pageOpenedList.length;
          for (let i = 1; i < len; i++) {
            if (pageOpenedList[i].name === name) {
              if (i < (len - 1)) {
                lastPageObj = pageOpenedList[i + 1];
              } else {
                lastPageObj = pageOpenedList[i - 1];
              }
              break;
            }
          }
        } else {
          let tagWidth = event.target.parentNode.offsetWidth;
          this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
        }
        this.$store.commit('removeTag', name);
        this.$store.commit('closePage', name);
        pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
        if (this.currentPageName === name) {
          this.linkTo(lastPageObj);
        }
      },
      color(item) {
        const currentItem = item.children ? item.children[0] : item;

        return (currentItem.name === this.currentPageName) ? 'blue' : 'default';
      },
      linkTo (item) {
        this.$router.push(item);
        //  待处理
        // let routerObj = {};
        // routerObj.name = item.name;
        // if (item.argu) {
        //   routerObj.params = item.argu;
        // }
        // if (item.query) {
        //   routerObj.query = item.query;
        // }
        // if (this.beforePush(item)) {
        //   this.$router.push(routerObj);
        // }
      },
      handlescroll (e) {
        var type = e.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        let left = 0;
        if (delta > 0) {
          left = Math.min(0, this.tagBodyLeft + delta);
        } else {
          if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
              left = this.tagBodyLeft;
            } else {
              left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
            }
          } else {
            this.tagBodyLeft = 0;
          }
        }
        this.tagBodyLeft = left;
      },
      clearTags (type) {
        console.log(type);
        if (type === 'clearAll') {
          this.$store.dispatch('clearAllTags');
          this.$router.push({
            name: 'home'
          });
        } else {
          this.$store.dispatch('clearOtherTags', this.currentPageName);
        }
        this.tagBodyLeft = 0;
      },
      moveToView (tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
          // 标签在可视区域
          this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
      }
    },
    mounted () {
      // this.refsTag = this.$refs.tagsPageOpened;
      // setTimeout(() => {
      //   this.refsTag.forEach((item, index) => {
      //     if (this.$route.name === item.name) {
      //       let tag = this.refsTag[index].$el;
      //       this.moveToView(tag);
      //     }
      //   });
      // }, 1); // 这里不设定时器就会有偏移bug
      // this.tagsCount = this.tags.length;
    },
    // watch: {
    //   '$route' (to) {
    //     this.currentPageName = to.name;
    //     this.$nextTick(() => {
    //       this.refsTag.forEach((item, index) => {
    //         if (to.name === item.name) {
    //           let tag = this.refsTag[index].$el;
    //           this.moveToView(tag);
    //         }
    //       });
    //     });
    //     this.tagsCount = this.tags.length;
    //   }
    // }
  };
</script>
