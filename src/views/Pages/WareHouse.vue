<template>
  <div class="container">
    <h1 class="title">仓库信息</h1>
    <div class="warehouse-info">
      <div class="header">
        <div class="label">名称</div>
        <div class="value">{{ warehouse.name }}</div>
      </div>
      <div class="header">
        <div class="label">地址</div>
        <div class="value">{{ warehouse.address }}</div>
      </div>
      <div class="header">
        <div class="label">总容量</div>
        <div class="value">{{ warehouse.totalCapacity }}</div>
      </div>
      <div class="header">
        <div class="label">已用容量</div>
        <div class="value">{{ warehouse.usedCapacity }}</div>
      </div>
    </div>
    <h2 class="subtitle">员工信息</h2>
    <table class="employee-table">
      <thead>
        <tr>
          <th>员工ID</th>
          <th>姓名</th>
          <th>职位</th>
          <th>联系方式</th>
          <th>部门ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in warehouse.employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.contact }}</td>
          <td>{{ employee.locationId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const warehouse = ref({});

async function getWareHouse() {
  const res = await axios.get('http://localhost:8080/warehouse/4');
  warehouse.value = res.data;
}

getWareHouse();
</script>

<style scoped>
.container {
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 900px;
  margin: 40px auto;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.warehouse-info {
  margin-bottom: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
}

.label {
  font-weight: bold;
}

.value {
  color: #333;
}

.subtitle {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 16px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
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
</style>