<script>
import { workBenchInfo, workRentInfo } from '@/api/home'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      workbench: {},
      tableData: [],
      query: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.queryWorkBench()
    this.initChart()
  },
  methods: {
    // 获取工作台数据
    async queryWorkBench() {
      const res = await workBenchInfo()
      this.workbench = res.data
      const rentRes = await workRentInfo()
      this.tableData = rentRes.data.rentAdvent
    },
    // echarts数据
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('income-chart'))
      // 绘制图表
      myChart.setOption({

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月']
          }],
        yAxis: [
          {
            type: 0
          }
        ],
        series: [
          {
            name: '物业费',
            type: 'bar',
            barWidth: 10,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            color: '#3656ff',
            data:
              [3708.34, 3750, 3708.34, 3750, 3750, 3625, 3750, 3708.34, 3750, 3708.34, 3750, 5291.67]
          },
          {
            name: '行车收入',
            type: 'bar',
            barWidth: 10,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            color: '#cde4ff',
            data:
              [560, 0, 1000, 2300, 360, 1050, 360, 560, 600, 1200, 0, 2040]
          }
        ]
      })
    }
  }
}
</script>

<template>
  <div class="databoard-container">
    <div class="left">
      <div class="info-wrapper">
        <p class="info-wrapper__title">园区数据</p>
        <div class="pard-data">
          <div class="item">
            <span class="label">年度累计收费（元）</span>
            <span class="value">{{ workbench.annualIncome }}</span>
          </div>
          <div class="item">
            <span class="label">入住企业总数（个）</span>
            <span class="value">{{ workbench.enterpriseTotal }}</span>
          </div>
          <div class="item">
            <span class="label">月卡车辆总数（辆）</span>
            <span class="value">{{ workbench.monthCardTotal }}</span>
          </div>
          <div class="item">
            <span class="label">一体杆总数（台）</span>
            <span class="value">{{ workbench.chargePoleTotal }}</span>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">年度收入统计</p>
        <div id="income-chart" class="chart-container" />
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">临期合同提醒</p>
        <div class="contract-list">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="enterpriseName" label="企业名称" />
            <el-table-column prop="buildingName" label="租凭楼宇" />
            <el-table-column label="租凭时间">
              <template slot-scope="scope">
                <span>{{ scope.startTime }}</span>至<span>{{ scope.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="text" size="small">续签</el-button>
                <el-button type="text" size="small">退租</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagebox">
          <el-pagination
            :current-page="query.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="query.pageSize"
            layout="total, prev, pager, next, sizes"
            :total="query.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /></div>
      </div>
    </div>
    <div class="right">
      <div class="info-wrapper">
        <p class="info-wrapper__title">快捷入口</p>
        <div class="fast-enter">
          <div class="item">
            <img src="../../assets/add-enterprise.png" class="img">
            <div class="label">添加企业</div>
          </div>
          <div class="item">
            <img src="../../assets/employee-manage.png" class="img">
            <div class="label">员工管理</div>
          </div>
          <div class="item">
            <img src="../../assets/add-bill.png" class="img">
            <div class="label">添加账单</div>
          </div>
          <div class="item">
            <img src="../../assets/data-screen.png" class="img">
            <div class="label">数据大屏</div>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">设备告警派单</p>
        <div class="warn-list">
          <img src="../../assets/empty.svg" alt="" class="icon">
          <el-button
            type="primary"
            round
            style="margin-top: 20px;
            border-radius: 22px!important;
            width: 100%;
            height: 36px;"
          >更多<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.databoard-container {
  padding: 0;
  background: #f4f6f8;
  display: flex;

  .left {
    flex-basis: 70%;
    margin-right: 20px;
  }

  .right {
    flex-basis: 30%;
  }

  .info-wrapper {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
    min-width: 260px;

      .info-wrapper__title {
        font-size: 14px;
        color: #303035;
        font-weight: 500;
        margin-bottom: 20px;
      }

      .pard-data {
        display: flex;
        justify-content: space-between;

        .item {
          display: flex;
          flex-direction: column;

          .label {
            color: #909399;
            margin-bottom: 12px;
            font-size: 14px;
          }

          .value {
            color: #303035;
            font-weight: 500;
            font-size: 24px;
          }
        }
      }

      .chart-container {
        width: 100%;
        height: 300px;
      }
      .pagebox {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
      }
      .fast-enter {
        display: flex;
        justify-content: space-between;

      .item {
        display: flex;
        text-align: center;
        flex-direction: column;
        cursor: pointer;

        .img {
          width: 44px;
          height: 44px;
          margin-bottom: 9px;
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }
    }
      }
      .warn-list {
        padding-left: 20px;
        text-align: center;

        .icon {
          width: 160px;
          height: 160px;
        }
      }
  }
}
</style>
