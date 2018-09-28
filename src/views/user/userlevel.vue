<template>
<div class="app-container calendar-list-container">

  <!-- 查询和其他操作 -->
  <div class="filter-container">
    <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入等级名称" v-model="listQuery.name">
    </el-input>
    <el-select clearable class="filter-item" v-model="listQuery.status" placeholder="请选择状态">
      <el-option label="全部" value="-1">
      </el-option>
      <el-option label="正常" value="0">
      </el-option>
      <el-option label="禁用" value="1">
      </el-option>
    </el-select>
    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    <el-button class="filter-item" type="primary" @click="handleCreate" icon="el-icon-edit">添加会员等级</el-button>
    <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button> -->
  </div>

  <!-- 查询结果 -->
  <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit highlight-current-row>

    <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row)" v-show="scope.row.status === 0 ? true : false">禁用</el-button>
          <el-button type="success" size="mini"  @click="handleJh(scope.row)" v-show="scope.row.status === 1 ? true : false">激活</el-button>
        </template>
    </el-table-column>

    <!-- <el-table-column align="center" width="150px" label="会员等级ID" prop="id" sortable>
    </el-table-column> -->

    <el-table-column align="center" min-width="100px" label="会员等级名称" prop="name">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="折扣" prop="discount">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="排序" prop="priority">
    </el-table-column>

    <el-table-column align="center" width="150px" label="是否禁用" prop="status">
      <template slot-scope="scope">
                  <el-tag :type="scope.row.status === 0 ? 'success' : 'error' ">{{scope.row.status === 0 ? '正常' : '禁用'}}</el-tag>
                </template>
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="创建时间" prop="createTime" :formatter="dateFormat">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="修改时间" prop="updateTime" :formatter="dateFormat">
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div class="pagination-container">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>

  <!-- 添加或修改对话框 -->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="会员等级名称" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>

      <el-form-item label="折扣" prop="discount">
        <el-input v-model="dataForm.discount"></el-input>
      </el-form-item>

      <el-form-item label="排序" prop="priority">
        <el-input v-model="dataForm.priority"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
      <el-button v-else type="primary" @click="updateData">确定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import {
  getUserLevelList,
  creatUserLevelList,
  deleteUserLevel,
  updateUserLevel
} from '@/api/userlevel'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'GoodsAttribute',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        name: undefined,
        status: undefined,
        sort: '+id'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        discount: undefined,
        priority: undefined,
        status: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [{
          required: true,
          message: '会员等级名称不能为空',
          trigger: 'blur'
        }],
        discount: [{
          required: true,
          message: '折扣不能为空',
          trigger: 'blur'
        }],
        priority: [{
          required: true,
          message: '排序不能为空',
          trigger: 'blur'
        }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserLevelList(this.listQuery).then(response => {
        this.list = response.data.recordList
        this.total = response.data.totalCount
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        discount: undefined,
        priority: undefined,
        status: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('发送的值\n' + JSON.stringify(this.dataForm, null, 2))
          creatUserLevelList(this.dataForm).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      var item = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

      this.dataForm.id = item.id
      this.dataForm.name = item.name
      this.dataForm.discount = item.discount
      this.dataForm.priority = item.priority
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('发送值：' + JSON.stringify(this.dataForm, null, 2))
          updateUserLevel(this.dataForm).then(() => {
            // for (const v of this.list) {
            //   if (v.id === this.dataForm.id) {
            //     const index = this.list.indexOf(v)
            //     this.list.splice(index, 1, this.dataForm)
            //     break
            //   }
            // }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDelete(row) {

      this.$confirm('确定禁用吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        deleteUserLevel(row).then(response => {
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success',
            duration: 2000
          })
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    handleJh(row) {
      var item = Object.assign({}, row)
      this.dataForm.id = item.id
      this.dataForm.status = 0
      this.$confirm('确定激活吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateUserLevel(this.dataForm).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '激活成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消激活'
        });
      });
    },
    handleDownload() {
      this.downloadLoading = true
      import ('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品参数ID', '商品ID', '商品参数名称', '商品参数值']
        const filterVal = ['id', 'goodsId', 'attribute', 'value']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品参数信息')
        this.downloadLoading = false
      })
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.getDateTime(date);
    }
  }
}
</script>
