<template>
  <Card>
    <span>图片上传公共组件：</span>
    <upload-image :on-success="handleSuccess" class="image-component"></upload-image>
  </Card>
</template>

<script>
  import uploadImage from 'components/upload-image'

  export default {
    name: "components",
    components: {
      uploadImage
    },
    methods: {
      handleSuccess(data) {

      }
    }
  }
</script>

<style scoped>
  .image-component {
    margin-top: 10px;
  }
</style>
