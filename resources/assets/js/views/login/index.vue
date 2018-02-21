<template>
  <div>
    <div id="particles-js"></div>
    <Row type="flex" justify="center" class-name="row">
      <Col span="6">
      <Card>
        <p slot="title">{{$t('login.title')}}</p>
        <Form ref="form" :model="form" :rules="ruleInline">
          <FormItem prop="email">
            <Input type="text" v-model="form.email" :placeholder="$t('login.email')">
            <Icon type="email" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password" class="bottom">
            <Input type="password" v-model="form.password" :placeholder="$t('login.password')">
            <Icon type="locked" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem class="bottom">
            <Checkbox v-model="form.remember" class="rememberMe">记住我</Checkbox>
            <router-link :to="{ name: 'password/reset'}" class="forgetPassword">
              <span>忘记密码？</span>
            </router-link>
          </FormItem>
          <FormItem class="bottom">
            <Button type="primary" @click="submit('form')" long>{{$t('login.login')}}</Button>
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
          password: '',
          remember: false
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .row {
    padding-top: 180px;
    .bottom {
      margin-bottom: 14px;
      .rememberMe {
        margin-left: 5px;
      }
      .forgetPassword {
        float: right;
      }
    }
  }

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background: {
      size: cover;
      color: #b61924;
      repeat: no-repeat;
      position: 50% 50%;
    }
  ;
  }
</style>
