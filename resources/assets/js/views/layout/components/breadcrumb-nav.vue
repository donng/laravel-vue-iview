<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="item in currentPath" :to="item.redirect || item.path" :key="item.name">
      {{ item.meta.title }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  export default {
    name: 'breadcrumbNav',
    data() {
      return {
        currentPath: []
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        const root = matched[0];
        if (root && root.name !== 'home') {
          matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
        }
        this.currentPath = matched;
      }
    },
    created() {
      this.getBreadcrumb();
    }
  };
</script>

