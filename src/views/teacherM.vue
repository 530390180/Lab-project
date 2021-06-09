<template>
  <!-- <el-dialog title="添加教师账号" v-model="centerDialogVisible2" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="userAdd"
    ></el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding:10px;margin-right:10px"
          @click="centerDialogVisible2 = false"
        >
          取 消
        </el-button>
        <el-button
          style="padding:10px;margin-left:10px"
          type="primary"
          @click="addUser"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog> -->
  <el-dialog title="教师信息修改" v-model="centerDialogVisible" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="teacherEdit"
    >
      <el-form-item
        :rules="[{ required: true, message: '姓名不能为空' }]"
        prop="name"
        label="姓名"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="teacherEdit.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '专业不能为空' }]"
        prop="profession"
        label="专业"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="teacherEdit.profession"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      v-loading="loading"
      id="addcourse"
      style="margin-top:5px; display: flex;align-items: center;justify-content: center;"
    >
      <el-button @click="resetPassword(teacherEdit.id)" round>
        <span style="margin:5px">重置密码</span>
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding:10px;margin-right:10px"
          @click="centerDialogVisible = false"
        >
          取 消
        </el-button>
        <el-button
          style="padding:10px;margin-left:10px"
          type="primary"
          @click="updateTeacher"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="添加教师" v-model="centerDialogVisible1" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="teacherAdd"
    >
      <el-form-item
        :rules="[
          { required: true, message: '教工号不能为空' },
          { type: 'number', message: '教工号必须为数字值' }
        ]"
        prop="id"
        label="教工号"
        style="margin: 20px;"
      >
        <el-input autocomplete="off" v-model.number="teacherAdd.id"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '姓名不能为空' }]"
        prop="name"
        label="姓名"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="teacherAdd.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '专业不能为空' }]"
        prop="profession"
        label="专业"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="teacherAdd.profession"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '用户名不能为空' }]"
        prop="userName"
        label="用户名"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="teacherAdd.userName"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '密码不能为空' }]"
        prop="password"
        label="密码"
        style="margin: 20px;"
      >
        <el-input
          type="password"
          autocomplete="off"
          v-model.number="teacherAdd.password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding:10px;margin-right:10px"
          @click="centerDialogVisible1 = false"
        >
          取 消
        </el-button>
        <el-button
          style="padding:10px;margin-left:10px"
          type="primary"
          @click="addTeacher"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div id="clist">
    <div><p style="margin:10px;font-size:40px">教师管理</p></div>
    <el-table
      max-height="415"
      fit="true"
      v-loading="loading"
      :data="
        tableData.filter(
          data =>
            !search ||
            data.id.toLowerCase().includes(search.toLowerCase()) ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.profession.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="border:2px solid black;"
    >
      <!-- <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教工号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.profession }}</span>
            </el-form-item>
            <el-form-item label="实验课程">
              <span>{{ props.row.profession }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column label="教工号" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="专业" prop="profession"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-tooltip
            class="item"
            effect="dark"
            content="您可以输入教工号、姓名、专业关键字进行搜索"
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
            <el-button
              style="width:50px;margin-bottom:1.5px"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              @confirm="handleDelete(scope.$index, scope.row)"
              confirmButtonText="确定"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该教师吗？"
            >
              <template #reference>
                <el-button
                  style="width:50px;margin-bottom:1.5px"
                  size="mini"
                  type="danger"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div id="addcourse" style="margin-top:5px">
      <el-button @click="centerDialogVisible1 = true" type="primary" plain>
        <span style="margin:5px">添加教师</span>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import {
  ADD_TEACHER,
  ADD_USER,
  DELETE_TEACHER,
  RESET_TEACHER_PASSORD,
  UPDATE_TEACHER
} from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const search = ref("");
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.teachers);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const labs = computed(() => store.state.labs);
    const handleDelete = (index: any, row: any) => {
      const tid = row.id;
      store.dispatch(DELETE_TEACHER, tid);
      load();
    };
    const centerDialogVisible = ref(false);
    const teacherEdit = ref({
      id: null,
      name: null,
      profession: null
    });
    const handleEdit = (index: any, row: any) => {
      centerDialogVisible.value = true;
      teacherEdit.value = {
        name: row.name,
        id: row.id,
        profession: row.profession
      };
    };
    const updateTeacher = () => {
      const teacher = {
        id: teacherEdit.value.id,
        name: teacherEdit.value.name,
        profession: teacherEdit.value.profession
      };
      store.dispatch(UPDATE_TEACHER, teacher);
      centerDialogVisible.value = false;
      load();
    };
    const centerDialogVisible1 = ref(false);
    const teacherAdd = ref({
      id: null,
      name: null,
      profession: null,
      userName: null,
      password: null
    });
    const addTeacher = () => {
      const teacher = {
        id: teacherAdd.value.id,
        name: teacherAdd.value.name,
        profession: teacherAdd.value.profession,
        userName: teacherAdd.value.userName,
        password: teacherAdd.value.password
      };
      store.dispatch(ADD_TEACHER, teacher);
      centerDialogVisible1.value = false;
      load();
    };
    const resetPassword = (id: any) => {
      console.log(id);
      store.dispatch(RESET_TEACHER_PASSORD, id);
      load();
    };
    return {
      resetPassword,
      labs,
      centerDialogVisible1,
      teacherAdd,
      addTeacher,
      centerDialogVisible,
      teacherEdit,
      handleEdit,
      updateTeacher,
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
