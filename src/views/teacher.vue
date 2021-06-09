<template>
  <el-dialog title="修改密码" v-model="centerDialogVisible2" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="passwordUpdate"
    >
      <el-form-item
        :rules="[{ required: true, message: '用户名不能为空' }]"
        prop="userName"
        label="用户名"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="passwordUpdate.userName"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { type: 'number', message: '密码必须为数字值' }
        ]"
        prop="oldPassword"
        label="旧密码"
        style="margin: 20px;"
      >
        <el-input
          type="password"
          autocomplete="off"
          v-model.number="passwordUpdate.oldPassword"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { type: 'number', message: '密码必须为数字值' }
        ]"
        prop="newPassword"
        label="新密码"
        style="margin: 20px;"
      >
        <el-input
          type="password"
          autocomplete="off"
          v-model.number="passwordUpdate.newPassword"
        ></el-input>
      </el-form-item>
    </el-form>
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
          @click="updatePassword"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="添加课程" v-model="centerDialogVisible1" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="courseAdd"
    >
      <el-form-item
        :rules="[{ required: true, message: '课程名称不能为空' }]"
        prop="name"
        label="课程名称"
        style="margin: 20px;"
      >
        <el-input autocomplete="off" v-model.number="courseAdd.name"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '学时不能为空' },
          { type: 'number', message: '学时必须为数字值' }
        ]"
        prop="classHour"
        label="课程学时"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="courseAdd.classHour"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '学生人数不能为空' },
          { type: 'number', message: '学生人数必须为数字值' }
        ]"
        prop="studentNumber"
        label="学生人数"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="courseAdd.studentNumber"
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
          @click="addCourse"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="课程编辑" v-model="centerDialogVisible" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="courseEdit"
    >
      <el-form-item
        :rules="[{ required: true, message: '课程名称不能为空' }]"
        prop="name"
        label="课程名称"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="courseEdit.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '学时不能为空' },
          { type: 'number', message: '学时必须为数字值' }
        ]"
        prop="classHour"
        label="课程学时"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="courseEdit.classHour"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '学生人数不能为空' },
          { type: 'number', message: '学生人数必须为数字值' }
        ]"
        prop="studentNumber"
        label="学生人数"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="courseEdit.studentNumber"
        ></el-input>
      </el-form-item>
    </el-form>
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
          @click="updateCourse"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div id="tleft">
    <div id="lunbo">
      <div class="block">
        <el-carousel trigger="click">
          <el-carousel-item>
            <img
              style="display:block;width:100%;height:100%"
              src="./../assets/innovation.jpg"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              style="display:block;width:100%;height:100%"
              src="./../assets/robot.jpg"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              style="display:block;width:100%;height:100%"
              src="./../assets/mobile-laboratory.jpg"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div id="tinfocontainer" style="border:2px solid black;border-radius:5px">
      <p style="margin-right:auto;" class="demonstration">个人信息</p>
      <div id="tinfo" style="margin-bottom:10px">
        <p style="font-size:20px">教师：{{ teacher.name }}</p>
        <p style="font-size:20px">教工号：{{ teacher.id }}</p>
        <p style="font-size:20px">专业：{{ teacher.profession }}</p>
        <el-button @click="centerDialogVisible2 = true" type="primary" plain>
          <span style="margin:5px">修改密码</span>
        </el-button>
      </div>
    </div>
  </div>
  <div id="tright">
    <div class="demonstration" style="border:2px black solid">
      实验课程管理
    </div>
    <div id="clist">
      <el-table
        v-loading="loading"
        max-height="390"
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 93%;border:2px solid black;"
      >
        <el-table-column
          v-if="false"
          label="课程id"
          prop="id"
        ></el-table-column>
        <el-table-column label="课程名称" prop="name"></el-table-column>
        <el-table-column label="学时" prop="classHour"></el-table-column>
        <el-table-column
          label="学生数量"
          prop="studentNumber"
        ></el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              style="width:100px;"
              v-model="search"
              size="mini"
              placeholder="课程搜索"
            />
          </template>
          <template #default="scope">
            <div style="display:flex">
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
                title="确定删除该课程吗？"
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
            <router-link
              :to="
                `/homepage/reserve?courseName=${scope.row.name}&&studentNumber=${scope.row.studentNumber}`
              "
            >
              <el-button
                style="width:60px;margin-top:1.5px"
                size="mini"
                type="success"
                round
              >
                预约
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div id="addcourse" style="margin-top:5px">
        <el-button @click="centerDialogVisible1 = true" type="primary" plain>
          <span style="margin:10px">添加课程</span>
        </el-button>
        <router-link style="margin:10px" to="/homepage/records">
          <el-button @click="getMyrecords" type="primary" round>
            <span>预约记录</span>
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import {
  ADD_COURSE,
  DELETE_COURSE,
  GET_TEACHER_RECORDS,
  UPDATE_COURSE,
  UPDATE_PASSWORD
} from "@/store/VuexTypes";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const centerDialogVisible2 = ref(false);
    const passwordUpdate = ref({
      userName: null,
      oldPassword: null,
      newPassword: null
    });
    const updatePassword = () => {
      const user = {
        userName: passwordUpdate.value.userName,
        oldPassword: passwordUpdate.value.oldPassword,
        newPassword: passwordUpdate.value.newPassword
      };
      store.dispatch(UPDATE_PASSWORD, user);
      centerDialogVisible2.value = false;
    };
    const teacher = computed(() => store.state.teacher);
    const tableData = computed(() => store.state.teacher.courses);
    const search = ref("");
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const centerDialogVisible = ref(false);
    const courseEdit = ref({
      id: null,
      name: null,
      classHour: null,
      studentNumber: null
    });
    const handleEdit = (index: any, row: any) => {
      centerDialogVisible.value = true;
      courseEdit.value = {
        name: row.name,
        classHour: row.classHour,
        studentNumber: row.studentNumber,
        id: row.id
      };
    };
    const updateCourse = () => {
      const course = {
        id: courseEdit.value.id,
        name: courseEdit.value.name,
        classHour: courseEdit.value.classHour,
        studentNumber: courseEdit.value.studentNumber
      };
      store.dispatch(UPDATE_COURSE, course);
      centerDialogVisible.value = false;
      load();
    };
    const handleDelete = (index: any, row: any) => {
      const cid = row.id;
      store.dispatch(DELETE_COURSE, cid);
      load();
    };
    const centerDialogVisible1 = ref(false);
    const courseAdd = ref({
      id: null,
      name: null,
      classHour: null,
      studentNumber: null
    });
    const addCourse = () => {
      const course = {
        id: courseAdd.value.id,
        name: courseAdd.value.name,
        classHour: courseAdd.value.classHour,
        studentNumber: courseAdd.value.studentNumber
      };
      store.dispatch(ADD_COURSE, course);
      centerDialogVisible1.value = false;
      load();
    };
    const getMyrecords = () => {
      store.dispatch(GET_TEACHER_RECORDS);
    };

    return {
      getMyrecords,
      search,
      handleEdit,
      handleDelete,
      teacher,
      loading,
      centerDialogVisible,
      centerDialogVisible1,
      courseEdit,
      courseAdd,
      updateCourse,
      addCourse,
      tableData,
      passwordUpdate,
      updatePassword,
      centerDialogVisible2
    };
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#tleft {
  flex-basis: 48%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  min-height: 70%;
}
#tright {
  border: 2px solid black;
  margin: 20px;
  flex-basis: 48%;
  position: relative;
  min-height: 70%;
  border-radius: 5px;
}
.demonstration {
  font-size: 25px;
  font-family: serif;
}
.el-carousel {
  border-radius: 5px;
  margin: 3px;
}
#tinfocontainer {
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#tinfo {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
#tinfo p {
  margin: 5.5px;
}
#lunbo {
  flex-basis: 45%;
}
.demonstration {
  margin: 20px;
}
#clist {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
