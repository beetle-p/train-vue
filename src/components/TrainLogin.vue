<template>
    <div class="train-login">
        <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入12306账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入12306密码"></el-input>
            </el-form-item>
            <div id="train-login-checkimg">
                <img src="http://localhost:8082/getcheckimg" @click="addMark" id="check-img">
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm" id="trainlogin-button">提交</el-button>
                <el-button @click="reloadCheckImg">获取验证码</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {trainLogin} from '../api/api.js'

  export default {
    name: "TrainLogin",
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          answer: ''
        },
      }
    },
    methods: {
      addMark(event) {
        let e = event || window.event;
        let div = document.createElement('div');
        div.style.position = 'absolute'
        div.style.left = e.clientX + "px";//div的css属性
        div.style.top = e.clientY + "px";
        div.classList.add("mark")
        div.style.width = 20 + 'px'
        div.style.height = 20 + 'px'
        div.style.backgroundColor = 'red'
        div.style.borderRadius = 10 + 'px'
        if (this.loginForm.answer === '') {
          this.loginForm.answer += (e.clientX - 130) + "%2C" + (e.clientY - 270)
        } else {
          this.loginForm.answer += "%2C" + (e.clientX - 130) + "%2C" + (e.clientY - 270)
        }
        document.getElementById("train-login-checkimg").appendChild(div)
      },
      submitForm() {
        trainLogin(this.loginForm).then((res) => {
          let code = res.code
          let msg = res.msg
          if (code !== 0) {
            this.$message({
              message: msg,
              type: 'error'
            })
            this.reloadCheckImg()
          } else {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.$router.push({path:'/home'})
          }
        })
      },
      resetForm() {
        let mark = document.getElementsByClassName("mark")
        while (mark.length > 0) {
          mark[0].remove()
        }
        this.loginForm.answer = ''
      },
      reloadCheckImg() {
        document.getElementById("check-img").setAttribute('src', 'http://localhost:8082/getcheckimg?rand=' + Math.random(),)
        this.resetForm()
      }
    }
  }
</script>

<style scoped lang="scss">
    .train-login {
        width: 500px;
        #trainlogin-button {
            float: left;
        }

    }
</style>