<template>
  <div>
    <div id="particles-js"></div>
    <Row type="flex" justify="center" class-name="row">
      <Col span="6">
      <Card>
        <p slot="title">重置密码</p>
        <Form ref="form" :model="form" :rules="rules">
          <FormItem label="邮箱" prop="email" class="bottom">
            <Input v-model="form.email" disabled></Input>
          </FormItem>
          <FormItem label="新密码" prop="password" class="bottom">
            <Input v-model="form.password"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input v-model="form.confirmPassword"></Input>
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
  export default {
    name: "reset",
    data () {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入的密码不匹配'));
        } else {
          callback();
        }
      };
      return {
        form: {
          email: '',
          token: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          password: [],
          confirmPassword: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
        },
      }
    },
    created () {
      this.form.email = this.$route.query.email;
      this.form.token = this.$route.params.token;
    },
    mounted () {
      particlesJS.load('particles-js', 'particles.json');
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .row {
    padding-top: 160px;
    .bottom {
      margin-bottom: 0px;
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
