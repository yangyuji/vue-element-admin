<template>
  <el-table :data="logsList">
    <el-table-column prop="component" label="组件名称">
    </el-table-column>
    <el-table-column prop="props" label="属性">
    </el-table-column>
    <el-table-column prop="url" label="地址">
    </el-table-column>
    <el-table-column label="message">
      <template slot-scope="scope">
        {{ scope.row.err.message }}
      </template>
    </el-table-column>
    <el-table-column label="stack">
      <template slot-scope="scope">
        {{ scope.row.err.stack}}
      </template>
    </el-table-column>
    <el-table-column prop="info" label="错误提示">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'debug',
    data() {
      return {
        logsList: []
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
