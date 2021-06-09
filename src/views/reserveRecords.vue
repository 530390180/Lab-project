<template>
  <div id="clist">
    <div><p style="color:gray;margin:10px;font-size:40px">预约记录</p></div>
    <el-table
      v-loading="loading"
      max-height="481"
      fit="true"
      :data="
        tableData.filter(
          data =>
            !search ||
            data.courseName.toLowerCase().includes(search.toLowerCase()) ||
            data.createTime.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="border:2px solid black;"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="预约时间：">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="实验课程名：">
              <span>{{ props.row.courseName }}</span>
            </el-form-item>
            <el-form-item label="实验室号：">
              <span>{{ props.row.lid }}</span>
            </el-form-item>
            <el-form-item label="周次：">
              <span>第{{ props.row.week }}周</span>
            </el-form-item>
            <el-form-item label="星期：">
              <span>星期{{ transformDay(props.row.day) }}</span>
            </el-form-item>
            <el-form-item label="第几节：">
              <span>第{{ props.row.lesson }}节</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-if="false"
        label="预约记录ID"
        prop="id"
      ></el-table-column>
      <el-table-column label="预约时间" prop="createTime"></el-table-column>
      <el-table-column label="实验室号" prop="lid"></el-table-column>
      <el-table-column label="实验课程名" prop="courseName"></el-table-column>
      <el-table-column v-if="false" label="周次" prop="week"></el-table-column>
      <el-table-column v-if="false" label="星期" prop="day"></el-table-column>
      <el-table-column
        v-if="false"
        label="第几节"
        prop="lesson"
      ></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-tooltip
            class="item"
            effect="dark"
            content="您可以输入课程名关键字进行搜索"
            placement="top"
          >
            <el-input
              style="width:100px;"
              v-model="search"
              size="mini"
              placeholder="搜索"
            />
          </el-tooltip>
        </template>

        <template #default="scope">
          <div class="buttons" style="display:flex">
            <el-popconfirm
              @confirm="handleDelete(scope.$index, scope.row)"
              confirmButtonText="确定"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="您确定要取消预约吗？"
            >
              <template #reference>
                <el-button
                  style="width:80px;margin-bottom:1.5px"
                  size="mini"
                  type="danger"
                >
                  取消预约
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { DELETE_TEACHER, DELETE_TEACHER_RESERVE } from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const search = ref("");
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.teacher.records);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const handleDelete = (index: any, row: any) => {
      const id = row.id;
      store.dispatch(DELETE_TEACHER_RESERVE, id);
      console.log(123);
      load();
      console.log(tableData);
    };

    const transformDay = (day: number): string => {
      let result = "";
      switch (day) {
        case 1:
          result = "一";
          break;
        case 2:
          result = "二";
          break;
        case 3:
          result = "三";
          break;
        case 4:
          result = "四";
          break;
        case 5:
          result = "五";
          break;
        case 6:
          result = "六";
          break;
        case 7:
          result = "日";
          break;
      }
      return result;
    };
    return {
      transformDay,
      load,
      handleDelete,
      loading,
      tableData,
      search
    };
  }
});
</script>
<style scoped>
#clist {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 900px;
  margin-top: 20px;
}
.buttons {
  margin-left: 100px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.item {
  margin: 4px;
}
</style>
