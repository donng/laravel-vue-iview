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
            @on-close="closeTag"
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
      initTags () {
        this.appendTag()
      },
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      },
      color(item) {
        const currentItem = item.children ? item.children[0] : item;
        return (currentItem.name === this.currentPageName) ? 'primary' : 'default';
      },
      linkTo (item) {
        this.$router.push(item);
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
      // 关闭标签
      closeTag(event, name) {
        this.$store.dispatch('closeTag', name);
        this.$router.push({name: 'home'})
      },
      clearTags (type) {
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
    },
    created() {
      this.initTags()
    }
  };
</script>
