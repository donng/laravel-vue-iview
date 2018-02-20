<template>
  <Breadcrumb>
    <BreadcrumbItem
        v-for="item in currentPath"
        :href="item.path"
        :key="item.name"
    >{{ itemTitle(item) }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  export default {
    name: 'breadcrumbNav',
    // props: {
    //   currentPath: Array
    // },
    data() {
      return {
        currentPath: []
      }
    },
    methods: {
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      }
    },
    created() {
      const route = this.$route;
      this.currentPath = [{
        title: 'hah',
        name: route.name,
        path: route.path
      }]
      //console.log(this.$route);
    }
  };
</script>

