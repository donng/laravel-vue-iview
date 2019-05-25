<template>
  <div>
    <Upload
        :on-success="handleSuccess"
        :format="format"
        :max-size="max_size"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :action="action"
    >
      <Button icon="ios-cloud-upload-outline">点击上传图片</Button>
    </Upload>
    <img :src="image" v-show="image !== ''"/>
  </div>
</template>

<!-- 图片上传公共组件 上传地址、图片类型和图片大小都设置了默认值，也可在父组件修改 -->

<script>
  export default {
    name: "upload-image",
    props: {
      action: {
        type: String,
        default: 'admin/images/upload'
      },
      // 允许上传的图片类型
      format: {
        type: Array,
        default: function () {
          return ['jpg', 'jpeg', 'png']
        }
      },
      max_size: {
        type: Number,
        default: 2048
      },
      image: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleSuccess (response) {
        if (response.code !== 0) {
          this.$Message.error(response.message)
        } else {
          this.$emit("on-success", response.data)
        }
      },
      handleFormatError () {
        const format = "jpg，jpeg，png"
        this.$Message.warning({
          content: '图片上传仅支持 ' + format + ' 的图片格式',
          duration: 3
        })
      },
      handleMaxSize () {
        this.$Message.warning({
          content: '图片大小不能超过 2 MB',
          duration: 3
        })
      }
    }
  }
</script>

<style scoped>
  img {
    margin-top: 5px;
    height: 200px;
    width: 200px;
  }
</style>

