<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    /*顶部栏用户信息*/
    .el-card-userinfo {
        border: none;
        ul {
            list-style: none;
            li {
                float: left;
                width: 100px;
                text-align: center;
                margin-bottom: 7px;
                label {
                    cursor: pointer;
                }
            }
            li:hover:not(.userinfo-pic) {
                background: #f2f2f2;
            }
            .userinfo-pic {
                width: 100%;
                margin-bottom: 10px;
                span {
                    display: block;
                    font-size: 12px;
                }
                img {
                    cursor: pointer;
                    height: 60px;
                    width: 60px;
                    border-radius: 30px;
                }

            }
        }
    }
</style>
