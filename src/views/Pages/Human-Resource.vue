<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { ElPagination, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElMessage, ElMessageBox } from 'element-plus';

// 响应式数据
const employees = ref([]);
const currentPage = ref(1);
const pageSize = ref(8);
const total = ref(0);
const searchPosition = ref('');
const dialogVisible = ref(false);
const dialogType = ref('add'); // 'add' 或 'edit'

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  position: '',
  contact: '',
  locationId: ''
});

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  position: [{ required: true, message: '请选择职位', trigger: 'change' }],
  contact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  locationId: [{ required: true, message: '请输入部门ID', trigger: 'blur' }]
});

// 职位选项
const positionOptions = ref([
  { value: '店长', label: '店长' },
  { value: '理货员', label: '理货员' },
  { value: '收银员', label: '收银员' },
  { value: '仓库主管', label: '仓库主管' },
  { value:'装卸工', label:'装卸工'}
]);

// 获取员工数据
async function getEmployees() {
  try {
    let url = `http://localhost:8080/employees/page?pageNum=${currentPage.value}&pageSize=${pageSize.value}`;
//搜索功能有问题
    if (searchPosition.value) {
      url = `http://localhost:8080/employees/position/position=${searchPosition.value}`;
    }

    const res = await axios.get(url);
    employees.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.error('获取数据失败:', error);
    ElMessage.error(`获取数据失败: ${error.message}`);
  }
}

// 打开对话框
function openDialog(type, row = {}) {
  dialogType.value = type;
  if (type === 'edit') {
    Object.assign(formData, row);
  } else {
    resetForm();
  }
  dialogVisible.value = true;
}

// 重置表单
function resetForm() {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
}

// 提交表单
async function submitForm() {
  try {
    const url = dialogType.value === 'add'
      ? 'http://localhost:8080/employee'
      : `http://localhost:8080/employee/${formData.id}`;

    const method = dialogType.value === 'add' ? 'post' : 'put';

    await axios({ method, url, data: formData });
    ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功');
    dialogVisible.value = false;
    getEmployees();
  } catch (error) {
    console.error('操作失败:', error);
    ElMessage.error(`操作失败: ${error.response?.data?.message || error.message}`);
  }
}

// 删除员工
function deleteEmployee(id) {
  ElMessageBox.confirm('确定删除该员工?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.delete(`http://localhost:8080/employee/${id}`);
      ElMessage.success('删除成功');
      getEmployees();
    } catch (error) {
      console.error('删除失败:', error);
      ElMessage.error(`删除失败: ${error.response?.data?.message || error.message}`);
    }
  }).catch(() => {});
}

// 分页处理
function handleCurrentChange(val) {
  currentPage.value = val;
  getEmployees();
}

function handleSizeChange(val) {
  pageSize.value = val;
  currentPage.value = 1;
  getEmployees();
}

// 职位搜索
function searchByPosition() {
  currentPage.value = 1;
  getEmployees();
}

// 重置搜索
function resetSearch() {
  searchPosition.value = '';
  getEmployees();
}

// 初始化数据
getEmployees();
</script>

<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <el-input
        v-model="searchPosition"
        placeholder="按职位搜索"
        style="width: 300px; margin-right: 10px"
      />
      <el-button type="primary" @click="searchByPosition">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
      <el-button type="success" @click="openDialog('add')" style="float: right">
        新增员工
      </el-button>
    </div>

    <!-- 员工表格 -->
    <h1 class="title">员工信息</h1>
    <table class="employee-table">
      <thead>
        <tr>
          <th>员工ID</th>
          <th>姓名</th>
          <th>职位</th>
          <th>联系方式</th>
          <th>部门ID</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.contact }}</td>
          <td>{{ employee.locationId }}</td>
          <td>
            <el-button size="small" @click="openDialog('edit', employee)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteEmployee(employee.id)"
            >
              删除
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[8, 16, 24, 32]"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '新增员工' : '编辑员工'">
      <el-form :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-select v-model="formData.position" placeholder="请选择职位">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="formData.contact" />
        </el-form-item>
        <el-form-item label="部门ID" prop="locationId">
          <el-input v-model="formData.locationId" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
          {{ dialogType === 'add' ? '添加' : '更新' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 样式保持不变 */
.container {
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 1200px;
  margin: 40px auto;
}

.search-container {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.employee-table th,
.employee-table td {
  border: 1px solid #e0e0e0;
  padding: 14px 10px;
  text-align: center;
  font-size: 1rem;
}

.employee-table th {
  background: #f0f4f8;
  color: #222;
  font-weight: 600;
}

.employee-table tr:nth-child(even) {
  background: #f7fafd;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
</style>