<template>
  <div>
    <template v-for="(item, index) in menuList" v-if="!item.hidden && item.children">
      <!-- 需要显示孩子节点的：只有一个孩子节点，且没有设置显示parent -->
      <Dropdown transfer  v-if="item.children.length === 1 && !item.showParent" placement="right-start" :key="index" @on-click="changeMenu">
        <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
          <Icon :size="20" :color="color" :type="item.children[0].meta.icon || item.icon"></Icon>
        </Button>
        <DropdownMenu style="width: 200px;" slot="list">
          <DropdownItem :name="item.children[0].name" :key="'d' + index">
            <Icon  v-if="item.children[0].meta && item.children[0].meta.icon" :color="color" :type="item.children[0].meta.icon || item.meta.icon"></Icon>
            <span style="padding-left:10px;">{{ item.children[0].meta.title }}</span></DropdownItem>
        </DropdownMenu>
      </Dropdown>
        <Dropdown transfer  v-else placement="right-start" :key="index" @on-click="changeMenu">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <Icon v-if="item.meta && item.meta.icon" :color="color" :size="20" :type="item.meta.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.name" :key="i">
                <Icon v-if="child.meta && child.meta.title" :color="color"  :type="child.icon"></Icon>
                <span style="padding-left:10px;">{{ child.meta.title }}</span></DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'sidebarMenuShrink',
    props: {
      menuList: {
        type: Array
      }
    },
    data() {
      return {
        color: 'white'
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
    created() {
      console.log(this.menuList);
    }
  };
</script>
