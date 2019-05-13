<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="名称筛选" :maxlength="20" v-model="listQuery.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.status" clearable placeholder="状态筛选">
            <el-option
              v-for="item in mapStatus"
              :key="item.statusId"
              :label="item.label"
              :value="item.statusId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFilter"><i class="el-icon-close"></i> 重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="toAdd"><i class="el-icon-plus"></i> 创建表单</el-button>
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
      v-loading="listLoading"
      element-loading-text="拼命加载中">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item class="all-line" label="图标">
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
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="author" width="100px" label="作者" align="center">
      </el-table-column>
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'published'" type="success">已发布</span>
          <span v-if="scope.row.status == 'draft'" type="success">已上架</span>
          <span v-if="scope.row.status == 'deleted'" type="info">已下架</span>
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
      <el-table-column prop="operation" width="120px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="toDelete(scope.row)">删除</el-button>
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

    <!-- 删除弹框 -->
    <el-dialog
      title="操作提示"
      :append-to-body="true"
      :visible.sync="delObj.show"
      width="30%">
      <span>确认删除当前数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delObj.show = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { parseTime } from '@/utils/index'
  import { fetchList, deleteArticle } from '@/api/article'

  export default {
    data() {
      return {
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          status: '',
          title: ''
        },
        tableList: [],
        tableExpands: [],
        getRowKeys(row) {
          return row.id
        },
        listLoading: true,
        delObj: {
          show: false,
          obj: null
        },
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
    watch: {
      listQuery: {
        deep: true,
        handler() {
          this.fetchData()
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const { data } = await fetchList(this.listQuery)
        this.tableList = data.list.map(v => {
          v.display = v.display_time
          this.$set(v, 'attr', '222')
          return v
        })
        this.total = data.total
        this.listLoading = false
      },
      formatTime(row, column) {
        return parseTime(row.timestamp)
      },
      resetFilter() {
        this.listQuery.status = ''
        this.listQuery.title = ''
      },
      toAdd() {
        this.$router.push({ path: './add' })
      },
      toEdit(row) {
        this.$router.push({ path: './edit/' + row.id })
      },
      toDelete(row) {
        this.delObj.show = true
        this.delObj.obj = row
      },
      async handleDelete() {
        this.delObj.show = false
        this.listLoading = true
        const { code } = await deleteArticle(this.delObj.obj.id)
        this.listLoading = false
        if (code === '0000') {
          if (this.tableList.length > 1) {
            const idx = this.tableList.findIndex((item) => {
              return item.id === this.delObj.obj.id
            })
            this.tableList.splice(idx, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.fetchData()
          }
        }
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.tableExpands = []
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
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
