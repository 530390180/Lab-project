<template>
  <!-- id?: string;
  machineNumber?: number;
  details?: string; -->
  <el-dialog title="实验室信息修改" v-model="centerDialogVisible" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="labEdit"
    >
      <el-form-item
        :rules="[
          { required: true, message: '机器数量不能为空' },
          { type: 'number', message: '机器数量必须为数字值' }
        ]"
        prop="machineNumber"
        label="机器数量"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="labEdit.machineNumber"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '机器配置不能为空' }]"
        prop="details"
        label="机器配置"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="labEdit.details"
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
          @click="updateLab"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="添加实验室" v-model="centerDialogVisible1" center>
    <el-form
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="labAdd"
    >
      <el-form-item
        :rules="[
          { required: true, message: '实验室号不能为空' },
          { type: 'number', message: '实验室号必须为数字值' }
        ]"
        prop="id"
        label="实验室号"
        style="margin: 20px;"
      >
        <el-input autocomplete="off" v-model.number="labAdd.id"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '机器数量不能为空' },
          { type: 'number', message: '机器数量必须为数字值' }
        ]"
        prop="machineNumber"
        label="机器数量"
        style="margin: 20px;"
      >
        <el-input
          autocomplete="off"
          v-model.number="labAdd.machineNumber"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '机器配置不能为空' }]"
        prop="details"
        label="机器配置"
        style="margin: 20px;"
      >
        <el-input
          type="age"
          autocomplete="off"
          v-model.number="labAdd.details"
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
          @click="addLab"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="Lab">
    <div><p style="margin:10px;font-size:40px">实验室管理</p></div>
    <div style="display:flex; justify-content:center ;  align-items: center;">
      <el-button @click="centerDialogVisible1 = true" type="primary" plain>
        <span style="margin-bottom:20px">添加实验室</span>
      </el-button>
      <div style="dispaly:flex;width:100px;margin-top:15px;margin-left:50px">
        <el-tooltip
          class="item"
          effect="dark"
          content="您可以输入实验室号进行搜索"
          placement="top"
        >
          <el-input v-model="search" placeholder="搜索" />
        </el-tooltip>
      </div>
    </div>
    <div class="labs" v-loading="loading">
      <el-card
        shadow="hover"
        class="box-card"
        v-for="(l, index) of labs"
        :key="index"
        :style="{ display: isShow(l.id) }"
      >
        <template #header>
          <div class="card-header" style="text-align:center">
            <h3>实验室号：{{ l.id }}</h3>
            <el-row>
              <el-button
                @click="handleEdit(l)"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>

              <el-popconfirm
                @confirm="handleDelete(l)"
                confirmButtonText="确定"
                cancelButtonText="不用了"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除该实验室吗？"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </template>
              </el-popconfirm>
            </el-row>
          </div>
        </template>
        <div class="labdetail">
          <el-collapse accordion>
            <el-collapse-item title="机器数量">
              <div>机器数量：{{ l.machineNumber }}</div>
            </el-collapse-item>
            <el-collapse-item title="机器配置">
              <div>
                {{ l.details }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { ADD_LAB, DELETE_LAB, UPDATE_LAB } from "@/store/VuexTypes";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };
    const open = () => {
      ElMessage.success({
        message: "操作成功",
        type: "success",
        showClose: true
      });
    };
    const open1 = () => {
      setTimeout(() => {
        open();
      }, 1100);
    };
    const store: Store<State> = useStore();
    const labs = computed(() => store.state.labs);
    const handleDelete = (lab: any) => {
      const lid = lab.id;
      store.dispatch(DELETE_LAB, lid);
      load();
    };
    const centerDialogVisible = ref(false);
    const labEdit = ref({
      id: null,
      machineNumber: null,
      details: null
    });
    const handleEdit = (lab: any) => {
      centerDialogVisible.value = true;
      labEdit.value = {
        id: lab.id,
        machineNumber: lab.machineNumber,
        details: lab.details
      };
    };
    const updateLab = () => {
      const lab = {
        id: labEdit.value.id,
        machineNumber: labEdit.value.machineNumber,
        details: labEdit.value.details
      };
      store.dispatch(UPDATE_LAB, lab);
      centerDialogVisible.value = false;
      load();
    };
    const centerDialogVisible1 = ref(false);
    const labAdd = ref({
      id: null,
      machineNumber: null,
      details: null
    });
    const addLab = () => {
      const lab = {
        id: labAdd.value.id,
        machineNumber: labAdd.value.machineNumber,
        details: labAdd.value.details
      };
      store.dispatch(ADD_LAB, lab);
      centerDialogVisible1.value = false;
      load();
    };
    const search = ref("");
    const isShow = computed(() => {
      return (id: string) => {
        if (!search.value) {
          return "inline-block";
        } else if (search.value && !id.includes(search.value.toLowerCase())) {
          return "none";
        } else {
          return "inline-block";
        }
      };
    });
    return {
      search,
      isShow,
      labs,
      centerDialogVisible1,
      labAdd,
      addLab,
      centerDialogVisible,
      labEdit,
      handleEdit,
      updateLab,
      handleDelete,
      loading
    };
  }
});
</script>
<style scoped>
.labs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 30px;
}

.labdetail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin-top: 10px;
  position: absolute;
  bottom: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 300px;
  min-height: 200px;
  margin: 15px;
  position: relative;
}
.Lab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
