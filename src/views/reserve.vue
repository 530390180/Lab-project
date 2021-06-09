<template>
  <el-dialog title="请选择周次" v-model="centerDialogVisible" center>
    <div id="zhouci">
      <div
        style="
          background-color: white;
          border:2px;
          display:flex;
          flex-wrap:wrap;
        "
      >
        <div
          style="display: flex;flex-direction: column;justify-content: center;align-items: center;border:2px solid;margin:5px;width:80px;height:80px"
          v-for="(djz, index) of dijizhou"
          :key="index"
        >
          <label style="cursor:pointer">
            <span :style="{ color: djz.activeColor }">第{{ djz.id }}周</span>
            <input
              v-model="teacherRecordsReserve.week"
              type="checkbox"
              name="dijizhou"
              :value="djz.id"
              :disabled="djz.active"
              style="cursor:pointer"
            />
          </label>
        </div>
      </div>
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
          @click="reserveThis"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div id="reserveContainer">
    <div id="selectClass">
      <el-select
        style="margin:19px"
        v-model="selectedLabLid"
        placeholder="实验室选择"
      >
        <el-option
          v-for="(el, index) of enableLabs"
          :key="index"
          :value="el.id"
        >
          <div style="text-align:center">{{ el.id }}</div>
        </el-option>
      </el-select>
    </div>
    <el-empty
      style="margin-top:50px"
      description="还没选择实验室喔~"
      v-if="!isSelect"
      :image-size="200"
    ></el-empty>
    <div
      v-if="isSelect"
      id="classSchedule"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <table border="1">
        <tr>
          <th style="color:green" aria-disabled="true"></th>
          <th style="color:green">第一节</th>
          <th style="color:green">第二节</th>
          <th style="color:green">第三节</th>
          <th style="color:green">第四节</th>
          <th style="color:green">第五节</th>
        </tr>
        <tr v-for="(w, index) of week" :key="index">
          <th style="color:green">{{ w.name }}</th>
          <td v-for="(s, index) of section" :key="index">
            <span
              class="yuyue"
              @click="reserveByWeekAndSection(w.id, s)"
              style="color:green"
            >
              预约
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Lab } from "@/datasource/Types";
import { UPDATE_RECORDS, UPDATE_TEACHER_RECORDS } from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1500);
    };
    const sn = useRoute().query.studentNumber;
    const courseName = useRoute().query.courseName;
    console.log(sn);
    console.log(courseName);
    const isSelect = ref(false);
    const selectedLabLid = ref("");
    const studentNumber = parseInt(`${sn}`);
    const allLabs = computed(() => store.state.labs);
    const enableLabs: Lab[] = allLabs.value.filter(
      l => l.machineNumber! >= studentNumber
    );
    watch(selectedLabLid, () => {
      load();
      store.dispatch(UPDATE_RECORDS, selectedLabLid.value);
      setTimeout(() => {
        isSelect.value = true;
      }, 1600);
    });
    const week = [
      {
        id: 1,
        name: "星期一"
      },
      {
        id: 2,
        name: "星期二"
      },
      {
        id: 3,
        name: "星期三"
      },
      {
        id: 4,
        name: "星期四"
      },
      {
        id: 5,
        name: "星期五"
      },
      {
        id: 6,
        name: "星期六"
      },
      {
        id: 7,
        name: "星期日"
      }
    ];
    const section = [1, 2, 3, 4, 5];
    const dijizhou = ref([
      { id: 1, active: !true, activeColor: "green" },
      { id: 2, active: !true, activeColor: "green" },
      { id: 3, active: !true, activeColor: "green" },
      { id: 4, active: !true, activeColor: "green" },
      { id: 5, active: !true, activeColor: "green" },
      { id: 6, active: !true, activeColor: "green" },
      { id: 7, active: !true, activeColor: "green" },
      { id: 8, active: !true, activeColor: "green" },
      { id: 9, active: !true, activeColor: "green" },
      { id: 10, active: !true, activeColor: "green" },
      { id: 11, active: !true, activeColor: "green" },
      { id: 12, active: !true, activeColor: "green" },
      { id: 13, active: !true, activeColor: "green" },
      { id: 14, active: !true, activeColor: "green" },
      { id: 15, active: !true, activeColor: "green" },
      { id: 16, active: !true, activeColor: "green" },
      { id: 17, active: !true, activeColor: "green" },
      { id: 18, active: !true, activeColor: "green" }
    ]);
    const centerDialogVisible = ref(false);
    const teacherRecordsReserve = ref({
      id: null,
      lid: selectedLabLid.value,
      tid: store.state.teacher.id,
      courseName: courseName,
      week: [], //周次
      day: 0, //星期几
      lesson: 0 //第几节课
    });
    const records = computed(() => store.state.reservationRecords);
    const reserveByWeekAndSection = (w: number, s: number) => {
      centerDialogVisible.value = true;
      teacherRecordsReserve.value.day = w;
      teacherRecordsReserve.value.lesson = s;
      teacherRecordsReserve.value.tid = store.state.teacher.id;
      teacherRecordsReserve.value.lid = selectedLabLid.value;
      teacherRecordsReserve.value.courseName = courseName;
      const recordedWeeks = records.value
        .filter(r => r.day == w && r.lesson == s)
        .map(r => r.week);
      dijizhou.value.forEach(djz => {
        recordedWeeks.forEach(rw => {
          if (rw == djz.id) {
            djz.active = true;
            djz.activeColor = "gainsboro";
          }
        });
      });
    };
    const reserveThis = () => {
      centerDialogVisible.value = false;
      store.dispatch(UPDATE_TEACHER_RECORDS, {
        id: teacherRecordsReserve.value.id,
        lid: teacherRecordsReserve.value.lid,
        tid: teacherRecordsReserve.value.tid,
        courseName: teacherRecordsReserve.value.courseName,
        week: teacherRecordsReserve.value.week, //周次
        day: teacherRecordsReserve.value.day, //星期几
        lesson: teacherRecordsReserve.value.lesson //第几节课
      });
      teacherRecordsReserve.value.week = [];
    };

    return {
      teacherRecordsReserve,
      reserveThis,
      reserveByWeekAndSection,
      enableLabs,
      centerDialogVisible,
      selectedLabLid,
      isSelect,
      week,
      section,
      dijizhou,
      loading
    };
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#classSchedule table {
  background-color: white;
  border-collapse: collapse;
  width: 68vw;
  height: 62vh;

  border: 3px solid floralwhite;
}
#classSchedule table tr {
  border-color: bisque;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu {
  min-width: 180px;
}
a {
  list-style: none;
  text-decoration: none;
  color: black;
}
td .el-button {
  color: green;
}
#zhouci {
  display: flex;
  justify-content: center;
}
#zhouci table {
  border-color: green;
  border: 2px solid green;
}
#zhouci td {
  padding: 20px;
  border: 2px solid green;
}
.yuyue:hover {
  font-weight: 900;
  cursor: pointer;
}
</style>
