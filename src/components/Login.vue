<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="title">登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('ruleForm')" style="width:100%;" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {requestLogin} from "../api/api";

  export default {
    name: 'Login',
    data() {
      // var validateUsername = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入账号'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validatePassword = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        logining: false,
        ruleForm: {
          username: 'pppap',
          password: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
            // {validator: validateUsername, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
            // {validator: validatePassword, trigger: 'blur'}
          ]
        },
        checked: false
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.logining = true
            requestLogin(this.ruleForm).then((res) => {
              this.logining = false
              let {code, msg, data} = res
              if(code!=200){
                this.$message({
                  message:msg,
                  type:'error'
                })
              }else{
                sessionStorage.setItem('user',JSON.stringify(data))
                this.$router.push({path:'/table'})
              }
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .remember {
      margin-bottom: 15px;
    }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #409EFF;
    }
  }


</style>
