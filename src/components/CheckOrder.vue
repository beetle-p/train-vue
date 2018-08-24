<template>
    <div class="check-order">
        <div class="order-info">
            <label>
                {{this.$route.params.train_date}}
            </label>日
            <label>
                {{this.$route.params.no}}
            </label>次列车
            <label>
                {{this.$route.params.query_from_station_name}}
            </label>站
            <label>
                ({{this.$route.params.startTime}})
            </label>开往
            <label>
                {{this.$route.params.query_to_station_name}}
            </label>站
            <label>
                ({{this.$route.params.endTime}})
            </label>

        </div>
        <div class="order-input">
            <div class="passenger-info">
                <label style="float: left;">
                    乘客信息:
                </label>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(item,index) in passengers" :label="item.passenger_name" :key="index"
                                 @change="addPassenger(index)">
                    </el-checkbox>
                </el-checkbox-group>
            </div>

            <el-table :data="confirmPassgers">
                <el-table-column type="index" width="50" label="序号" align="center">
                </el-table-column>
                <el-table-column label="席别" align="center" prop="selectedSeat">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.selectedSeat" placeholder="请选择席别" value="">
                            <el-option
                                    v-for="(item,index) in availableSeat" :key="index"
                                    :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="票种" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.passenger_type_name" placeholder="请选择票种" value="">
                            <el-option
                                    v-for="(item,index) in availableTicketType" :key="index"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.passenger_name" placeholder="请输入姓名"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="证件类型" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.passenger_id_type_name" placeholder="请输入证件号码"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="证件号码" align="center" prop="passenger_id_no">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.passenger_id_no" placeholder="请输入证件号码"></el-input>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, confirmPassgers)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="addTable" id="add-passenger">添加乘客</el-button>
            <el-button type="primary" @click="checkOrder" id="check-button" >提交订单</el-button>
        </div>
    </div>
</template>

<script>
  import {submitOrder} from '../api/api.js'

  export default {
    name: "CheckOrder",
    data() {
      return {
        checkList: [],
        passengers: [],
        confirmPassgers: [],
        availableSeat: ['一等座', '二等座', '无座'],
        availableTicketType: ['成人票', '儿童票', '残军票', '学生票'],
        // selectedSeat: '',
        // selectedTicketType: ''
      }
    },
    methods: {
      addTable() {
        this.confirmPassgers.push({
          selectedSeat: '',
          passenger_type_name: '',
          passenger_id_no: '',
          passenger_name: '',
          passenger_id_type_name: '二代身份证'
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addPassenger(index) {
        this.confirmPassgers.push(this.passengers[index])
        console.log(this.passengers[index])
      },
      checkOrder(){

      }
    },
    mounted() {
      submitOrder(this.$route.params).then(res => {
        this.passengers = res.data
      })

    }
  }
</script>

<style scoped lang="scss">
    .check-order {
        width: 1190px;
        margin-right: auto;
        margin-left: auto;
        .order-info {
            height: 35px;
            width: 100%;
            border: 1px solid #dcdfe6;
            label {
                font-size: 22px;
                font-weight: bold;
                color: #20a0ff;
            }
        }
        .order-input {
            width: 100%;
            border: 1px solid #dcdfe6;
            .passenger-info {
                float:left;
                width: 100%;
                height: 50px;
                padding-top: 10px;
            }
            #add-passenger {
                float: left;
                margin-top: 10px;
            }
            #check-button{
                float: right;
                margin-top: 10px;
            }
        }
    }
</style>