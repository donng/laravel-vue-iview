<template>
  <Row type="flex" justify="center" align="middle">
    <Col span="6">
    <Card>
      <p slot="title">Sign In</p>
      <Form ref="form" :model="form" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="form.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('form')" long>登录</Button>
        </FormItem>
      </Form>
    </Card>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        form: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写登录密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能低于6个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
