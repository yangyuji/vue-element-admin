
<template>
  <div class="app-container">
    <div v-if="!id" class="steps-container">
      <el-steps :active="0" finish-status="success">
        <el-step title="创建表单"></el-step>
        <el-step title="上传文件"></el-step>
        <el-step title="提交审核"></el-step>
      </el-steps>
    </div>
    <el-form :model="form" :rules="rules" v-loading="listLoading" ref="editForm" label-width="120px" class="edit-form">
      <el-form-item label="名称" prop="appName">
        <el-input v-model="form.title" placeholder="最多输入30个字" :maxlength="30" style="width:320px;"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="appPackage">
        <el-input :disabled="!!id" v-model="form.type" :maxlength="200" placeholder="填写类型" style="width:320px;"></el-input>
      </el-form-item>
      <el-form-item label="提供方" prop="appProvider">
        <el-autocomplete style="width:320px;" :maxlength="200"
                         class="inline-input"
                         v-model="form.author"
                         placeholder="查找已有公司或添加新公司"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="搜索平台" prop="platforms">
        <el-select style="width:320px;"
                   v-model="form.platforms"
                   multiple
                   filterable
                   allow-create
                   default-first-option
                   placeholder="自定义关键字">
          <el-option
            v-for="item in searchKeys"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="content_short">
        <el-input type="text" :maxlength="50" v-model="form.content_short" placeholder="一句话描述"></el-input>
        <span style="font-size: 12px;color: #606266;">此内容会显示在名称的下方</span>
      </el-form-item>
      <el-form-item label="详情介绍" prop="appDesc">
        <el-input type="textarea"
                  :minlength="10"
                  :maxlength="500"
                  :autosize="{ minRows: 3 }"
                  v-model="form.content"
                  placeholder="输入10~500字">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ id ? '保存修改' : '立即创建' }}</el-button>
        <el-button @click="linkBack">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import { createArticle, updateArticle, fetchArticle } from '@/api/article'

  export default {
    data() {
      return {
        listLoading: true,
        form: {
          title: '',
          type: '',
          author: '',
          platforms: [],
          content_short: '',
          content: ''
        },
        searchKeys: [],
        rules: {
          title: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者', trigger: 'blur' },
            { max: 200, message: '长度在 200 个字符以内', trigger: 'blur' }
          ],
          content: [
            { type: 'string', required: true, message: '请输入详情介绍', trigger: 'blur' },
            { max: 200, message: '长度在 200 个字符以内', trigger: 'blur' }
          ],
          platforms: [
            { type: 'array', required: true, message: '请至少输入一个搜索关键字', trigger: 'blur' }
          ],
          content_short: [
            { required: true, message: '请输入一句话简介', trigger: 'blur' },
            { max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
          ]
        }
      }
    },
    props: ['id'],
    mounted() {
      this.fetchDetail()
    },
    methods: {
      submitForm() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            if (this.id) {
              this.form.id = this.id
              updateArticle(this.form).then(() => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              })
            } else {
              createArticle(this.form).then((res) => {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              })
            }
          }
        })
      },
      fetchDetail() {
        if (this.id) {
          this.listLoading = true
          fetchArticle(this.id).then((res) => {
            this.form = res.data
            this.listLoading = false
          }).catch(_ => {
            this.listLoading = false
          })
        } else {
          this.listLoading = false
        }
      },
      linkBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .steps-container {
    max-width: 760px;
    margin: 20px 30px 30px 30px;
  }
  .edit-form {
    max-width: 760px;
  }
</style>
