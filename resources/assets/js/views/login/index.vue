<template>
  <div>
    <div id="particles-js"></div>
    <Row type="flex" justify="center" class-name="row">
      <Col span="6">
      <Card>
        <p slot="title">Sign In</p>
        <Form ref="form" :model="form" :rules="ruleInline">
          <FormItem prop="email">
            <Input type="text" v-model="form.email" placeholder="邮箱地址">
            <Icon type="email" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="密码">
            <Icon type="locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit('form')" long>登录</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import particles from 'particles.js'

  export default {
    name: "index",
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        ruleInline: {
          email: [
            { required: true, message: '请填写邮箱地址', trigger: 'blur' }
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
            this.$store.dispatch('login', this.form).then(() => {
              this.$router.push('/');
            })
          }
        })
      }
    },
    mounted () {
      particlesJS.load('particles-js', 'particles.json');
    }
  }
</script>

<style scoped>
  .row {
    padding-top: 180px;
  }

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #b61924;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
</style>
