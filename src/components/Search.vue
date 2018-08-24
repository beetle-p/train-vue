<template>
    <div class="search-content">
        <div class="search-box">
            <el-autocomplete v-model="station_value1" :fetch-suggestions="querySearchAsync" placeholder="输入拼音首字母或汉字"
                             @select="stationSelect1">
                <template slot="prepend">起点站</template>
            </el-autocomplete>
            <el-autocomplete v-model="station_value2" :fetch-suggestions="querySearchAsync" placeholder="输入拼音首字母或汉字"
                             @select="stationSelect2">
                <template slot="prepend">到达站</template>
            </el-autocomplete>
            <el-date-picker v-model="queryData.time" align="right" type="date" placeholder="选择日期"
                            :picker-options="pickerOptions1"
                            value-format="yyyy-MM-dd">
            </el-date-picker>

            <el-button type="primary" icon="el-icon-search" id="query-button" @click="query">查询</el-button>
        </div>
        <div class="data-box">
            <el-table :data="stationsData"
                      v-loading="loading"
                      element-loading-text="加载中......"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="hsla(0,0%,100%,.9)"
                      style="width: 100%">
                <el-table-column prop="no" label="车次" header-align="center">
                </el-table-column>
                <el-table-column prop="startStationName" label="起点站" header-align="center">
                </el-table-column>
                <el-table-column prop="endStationName" label="到达站" header-align="center">
                </el-table-column>
                <el-table-column  label="出发时间到达时间" header-align="center" width="80" >
                    <template slot-scope="scope">
                        {{scope.row.startTime}}
                        <br>
                        {{scope.row.endTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="durationTime" label="历时" header-align="center">
                </el-table-column>
                <el-table-column prop="seat1" label="软卧" header-align="center">
                </el-table-column>
                <el-table-column prop="seat2" label="无座" header-align="center">
                </el-table-column>
                <el-table-column prop="seat3" label="硬卧" header-align="center">
                </el-table-column>
                <el-table-column prop="seat4" label="硬座" header-align="center">
                </el-table-column>
                <el-table-column prop="seat5" label="二等座" header-align="center">
                </el-table-column>
                <el-table-column prop="seat6" label="一等座" header-align="center">
                </el-table-column>
                <el-table-column prop="seat7" label="商务座特等座" header-align="center" width="70">
                </el-table-column>
                <el-table-column label="操作" header-align="center">
                    <template slot-scope="scope">
                        <el-button  type="primary" @click="submitOrder(scope.$index, scope.row)">购买</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import station_names from '../assets/js/station.js'
  import {queryStation} from '../api/api.js'

  export default {
    name: "Search",
    data() {
      return {
        stations1: [],
        stations2: [],
        station_value1: '',
        station_value2: '',
        loading: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        queryData: {
          startStation: '',
          endStation: '',
          time: ''
        },
        stationsData: [],

      }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        let stations2 = this.stations2
        let results = queryString ? stations2.filter(this.createFilter(queryString.toLowerCase())) : stations2
        cb(results)
      },
      //输入字母匹或汉字配
      createFilter(queryString) {
        return (station) =>
          (station.name.indexOf(queryString) === 0 || station.shortSpell1.indexOf(queryString) === 0 || station.shortSpell2.indexOf(queryString) === 0 || station.longSpell.indexOf(queryString) === 0)
      },
      //匹配站点名称
      createFilter2(stationNo) {
        return station => station.shorthand === stationNo
      },
      stationSelect1(item) {
        this.queryData.startStation = item.shorthand
      },
      stationSelect2(item) {
        this.queryData.endStation = item.shorthand
      },
      query: function () {
        this.loading = true
        queryStation(this.queryData).then(res => {
          let {code, msg, data} = res
          if (code === 1) {
            for (let i = 0; i < data.length; i++) {
              let endStation = this.stations2.filter(this.createFilter2(data[i].endStation))
              let startStation = this.stations2.filter(this.createFilter2(data[i].startStation))
              data[i].startStationName = startStation[0].name
              data[i].endStationName = endStation[0].name
            }
            this.stationsData = data
          } else {
            this.$message({
              message: msg,
              type: 'error'
            })
          }
          this.loading = false
        })
      },
      submitOrder(index, row) {
        let data={
          secretStr:row.secret,
          train_date:this.queryData.time,
          back_train_date:this.queryData.time,
          query_from_station_name:this.station_value1,
          query_to_station_name:this.station_value2,
        }
        data.startTime=row.startTime
        data.endTime=row.endTime
        data.no=row.no
        this.$router.push({
          name:'checkOrder',
          params:data
        })
      }
    },
    mounted() {
      let stations1 = station_names.split('@');
      stations1.splice(0, 1)
      let stations2 = []
      for (let i in stations1) {
        let s1 = stations1[i]
        if (s1.length > 3) {
          let s2 = s1.split('|')
          let station = {
            value: s2[1],
            name: s2[1],
            shortSpell1: s2[0],
            shortSpell2: s2[4],
            "longSpell": s2[3],
            no: s2[5],
            shorthand: s2[2]
          }
          stations2.push(station)
        }
      }
      this.stations1 = stations1
      this.stations2 = stations2
    }

  }
</script>

<style lang="scss" scoped>

    .search-content {
        #query-button {
            margin: 0 20px 0 20px;
        }
        .search-box {
            margin-bottom: 20px;
        }
        .el-autocomplete {
            width: 400px;
            margin-right: 20px;
        }
        .data-box {
            width: 1190px;
            margin-right: auto;
            margin-left: auto;
            .el-table {
                border: 1px solid #dcdfe6;
                border-bottom: none;
                font-size: 14px;
            }
        }
    }
</style>