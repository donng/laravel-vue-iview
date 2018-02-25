<template>
  <div>
    <div id="particles-js"></div>
    <Row type="flex" justify="center" class-name="row">
      <Col span="6">
      <Card>
        <p slot="title">找回密码</p>
        <Form ref="form" :model="form" :rules="rules" label-position="top">
          <FormItem label="邮箱" prop="email">
            <Input v-model="form.email"></Input>
          </FormItem>
          <FormItem class="bottom">
            <Button type="primary" @click="submit('form')" long>下一步</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import particles from 'particles.js'

  import { sendEmail } from "api/login";

  export default {
    name: "email",
    data () {
      return {
        form: {
          email: ''
        },
        rules: {
          email: [
            { required: true, message: '请填写邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请填写正确的邮箱地址', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            sendEmail(this.form.email).then((response) => {
              console.log(response);
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
  }
</style>
