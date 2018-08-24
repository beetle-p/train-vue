<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-container" label-position="left"
             label-width="0px">
        <h3 class="title">请输入序列号</h3>
        <el-form-item prop="checkId">
            <el-input type="text" v-model="ruleForm.checkId" auto-complete="off" placeholder="请输入验证序列"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')" style="width:100%;" :loading="logining">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        ruleForm: {
          checkId: 'iwejgiu980234IOUIG98iejIjewirwe89J',
        },
        rules: {
          checkId: [
            {required: true, message: '请输入序列号', trigger: 'blur'}
          ],
        },
        checked: false
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.logining = true
            // login(this.ruleForm).then((res) => {
            //   this.logining = false
            //   let {code, msg, data} = res
            //   if(code!=200){
            //     this.$message({
            //       message:msg,
            //       type:'error'
            //     })
            //   }else{
            //     sessionStorage.setItem('user',JSON.stringify(data))
            //     this.$router.push({path:'/table'})
            //   }
            // })
            if (this.ruleForm.checkId === 'iwejgiu980234IOUIG98iejIjewirwe89J') {
              let data = {userId: this.ruleForm.checkId}
              sessionStorage.setItem('user', JSON.stringify(data))
              this.$router.push({path: '/home'})
            } else {
              this.$message({
                message: '序列号错误',
                type: 'error'
              })
            }
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
