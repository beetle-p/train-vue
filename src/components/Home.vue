<template>

  <el-container class="container">
    <!--导航栏-->
    <div class="aside">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse">
        <el-menu-item index="0" @click="collapse" class="menu-head">
          <i class="el-myicon-category"></i>
        </el-menu-item>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''">
            <template slot="title">
              <i class="el-myicon-map"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="(child,index2) in item.children" :index="index+'-'+index2" :key="child.path"
                          @click="$router.push(child.path)">
              {{child.name}}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <el-container>
      <!--顶部栏-->
      <el-header>
        <div style="float: right;" class="userinfo">
          <el-popover placement="bottom" width="250" trigger="hover">
            <el-card class="el-card-userinfo" shadow="never" body-style="padding:0;margin:0;">
              <ul>
                <li class="userinfo-pic">
                  <img src="../assets/default_handsome.jpg"/>
                  <span>{{userinfo.email}}</span>
                </li>
                <li>
                  <i class="el-myicon-wode"></i>
                  <label>基本资料</label>
                </li>
                <li>
                  <i class="el-myicon-shezhi"></i>
                  <label>安全设置</label>
                </li>
                <li>
                  <i class="el-myicon-xiaoxizhongxin"></i>
                  <el-badge :value="3">
                    <label>我的消息</label>
                  </el-badge>
                </li>
                <li>
                  <i class="el-myicon-guanbijiantou"></i>
                  <label @click="logout">退出登录</label>
                </li>
              </ul>
            </el-card>
            <el-col slot="reference">
              <span class="userinfo-inner">{{userinfo.username}}
                <img src="../assets/default_handsome.jpg"/>
              </span>
            </el-col>
          </el-popover>
        </div>

      </el-header>
      <!--主要内容区域-->
      <el-main class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :to="{path:item.path}" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-main>
    </el-container>


  </el-container>

</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        isCollapse: false,
        userPic: 'default_handsome.jpg',
        userinfo:{}
      };
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted: function () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.userinfo=user
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    height: 100%;
  }

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    .aside {
      height: 100%;
      border-right: solid 1px #e6e6e6;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
      }
      .el-menu {
        border: none;
      }

    }
    .el-container {
      width: 100%;
      height: 100%;
      .el-header {
        line-height: 80px;
        height: 80px;
        width: 100%;
        background: #20a0ff;
        .userinfo {
          text-align: right;
          padding-right: 35px;
          float: right;
          .userinfo-inner {
            cursor: pointer;
            color: #fff;
            img {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              margin: 10px 0px 10px 10px;
              float: right;
            }
          }
        }
      }

      .content-container {

        .breadcrumb-container {
          margin-bottom: 10px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }

</style>
