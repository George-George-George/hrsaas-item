<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
<<<<<<< HEAD
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
=======
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="loginrules"
>>>>>>> department
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>

      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-container"></i>
        <el-input v-model="loginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="password">
<<<<<<< HEAD
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
=======
        <i class="svg-container">
          <svg-icon iconClass="password" />
        </i>
        <el-input type="password" v-model="loginForm.password"> </el-input>
      </el-form-item>

      <el-button
        type="primary"
        class="loginBtn"
        style="width: 100%; margin-bottom: 30px"
        @click="login"
        :loading="isLogin"
        >??????</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">??????: 13800000002</span>
        <span> ??????: 123456</span>
>>>>>>> department
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
<<<<<<< HEAD
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
=======
      loginrules: {
        mobile: [
          { required: true, message: '??????????????????', trigger: 'blur' },
          {
            pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
            message: '????????????????????????',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '???????????????', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: '?????????????????????',
            trigger: 'blur'
          }
        ]
      },
      isLogin: false
>>>>>>> department
    }
  },
  methods: {
    async login() {
      try {
        this.isLogin = true
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/getToken', this.loginForm)

        this.$router.push('/')
        this.$message.success('????????????')
      } catch (error) {
        console.log(error)
      } finally {
        this.isLogin = false
      }
<<<<<<< HEAD
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
=======
>>>>>>> department
    }
  }
}
</script>

<style lang="scss">
/* ??????input ??????????????? ??????????????? */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
<<<<<<< HEAD
$light_gray: #fff;
$cursor: #fff;
=======
$light_gray: #68b0fe;
$cursor: #68b0fe;
>>>>>>> department

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // ??????????????????
  background-position: center; // ??????????????????????????????????????????
  .el-form-item__error {
    color: #fff;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // ??????????????????????????????
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
