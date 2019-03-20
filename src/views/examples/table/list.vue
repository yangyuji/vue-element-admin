<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item >
          <el-input placeholder="名称查询" :maxlength="20" v-model="listQuery.appName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.appStatus" clearable placeholder="状态查询">
            <el-option
              v-for="item in mapStatus"
              :key="item.statusId"
              :label="item.label"
              :value="item.statusId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i> 查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFilter()"><i class="el-icon-close"></i> 重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="toAdd()"><i class="el-icon-plus"></i> 创建应用</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table
      border
      highlight-current-row
      :data="tableList"
      :row-key="getRowKeys"
      :expand-row-keys="tableExpands"
      :current-row-key="tableSelected"
      v-loading="listLoading"
      element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item class="all-line" label="应用图标">
              <img :src="props.row.image_uri">
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="简介">
              <span>{{ props.row.content_short }}</span>
            </el-form-item>
            <el-form-item label="最后更新">
              <span>{{ formatTime(props.row) }}</span>
            </el-form-item>
            <el-form-item class="all-line" label="一句话">
              <span>{{ props.row.content_short }}</span>
            </el-form-item>
            <el-form-item class="all-line" label="图文介绍">
              <span v-html="props.row.content"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" width="46px" align="center" label="编码">
      </el-table-column>
      <el-table-column prop="title" width="220px" label="标题">
      </el-table-column>
      <el-table-column prop="author" width="100px" label="作者" align="center">
      </el-table-column>
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'published'"  type="success">已发布</span>
          <span v-if="scope.row.status == 'draft'"  type="success">已上架</span>
          <span v-if="scope.row.status == 'deleted'"  type="info">已下架</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatTime" label="时间" width="150px">
      </el-table-column>
      <el-table-column prop="latestVersion" label="国籍" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="importance" label="数字" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="operation" width="220px" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="toPackage(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination layout="total, sizes, prev, pager, next, jumper"
                   background
                   :page-size="listQuery.pageSize"
                   @size-change="handleSizeChange"
                   :total="total"
                   @current-change="handleCurrentChange"
                   style="text-align:right;margin-top:20px;">
    </el-pagination>

  </div>
</template>

<script>
  import { parseTime } from '@/utils/index'
  import { fetchList } from '@/api/article'

  export default {
    data() {
      return {
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          appName: '',
          appStatus: '',
          categoryId: ''
        },
        currentCate: [],
        tableList: [],
        tableExpands: [],
        tableSelected: -1,
        getRowKeys(row) {
          return row.id
        },
        category: [{
          id: 0,
          categoryName: '根类',
          children: []
        }],
        existCategory: {},
        listLoading: true,
        deleteShow: false,
        mapStatus: [
          {
            statusId: 'published',
            label: '已发布'
          }, {
            statusId: 'draft',
            label: '已上架'
          }, {
            statusId: 'deleted',
            label: '已下架'
          }
        ]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        for (const attr in this.listQuery) {
          if (this.listQuery[attr] === '') delete this.listQuery[attr]
          if (typeof this.listQuery[attr] === 'object' && this.listQuery[attr].length === 0) delete this.listQuery[attr]
        }
        fetchList(this.listQuery).then(res => {
          console.log(res.data)
          this.total = res.data.total
          this.tableList = res.data.list
          this.listLoading = false
        }).catch(_ => {
          this.listLoading = false
        })
      },
      chooseCategory(val) {
        this.listQuery.categoryId = val[val.length - 1]
      },
      formatTime(row, column) {
        return parseTime(row.timestamp)
      },
      doFilter() {
        if (this.listQuery.appStatus === '' &&
          !this.listQuery.categoryId &&
          !this.listQuery.appName) {
          this.$message({
            message: '请输入查询条件',
            type: 'warning'
          })
          return
        }
        this.fetchData()
      },
      resetFilter() {
        this.listQuery.appStatus = ''
        this.listQuery.categoryId = ''
        this.currentCate = []
        this.listQuery.appName = ''
        this.fetchData()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.fetchData()
        this.tableExpands = []
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
        this.fetchData()
      }
    }
  }
</script>
<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    font-size: 12px;
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table-expand .el-form-item.all-line {
    width: 100%;
  }
  .table-expand .el-form-item img {
    width: 60px;
    height: 60px;
  }
</style>
