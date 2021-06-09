import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";
import axios from "@/axios";
import {} from "vue-router";
import { Lab, ReservationRecord, Teacher, User } from "@/datasource/Types";
import { ResultVO } from "@/mock";
import { ElMessage } from "element-plus";

const open = () => {
  ElMessage.success({
    message: "操作成功",
    type: "success",
    showClose: true,
    offset: 30
  });
};
const open1 = () => {
  setTimeout(() => {
    open();
  }, 50);
};
export interface State {
  exception: string;
  user: User;
  teacher: Teacher;
  labs: Lab[];
  teachers: Teacher[];
  // teacherRecords: ReservationRecord[];
  reservationRecords: ReservationRecord[];
}

const myState: State = {
  exception: "",
  user: {},
  teacher: { courses: [], records: [] },
  // teacherRecords:[],
  labs: [],
  teachers: [],
  reservationRecords: []
};

const myMutations: MutationTree<State> = {
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  [vxt.UPDATE_TEACHER]: (state, data: Teacher) =>
    (state.teacher = {
      id: data.id,
      name: data.name,
      profession: data.profession,
      courses: data.courses
    }),
  [vxt.UPDATE_COURSE]: (state, data) => (state.teacher.courses = data),
  [vxt.UPDATE_LABS]: (state, data) => (state.labs = data),
  [vxt.UPDATE_TEACHERS]: (state, data) => (state.teachers = data),
  [vxt.UPDATE_EXCEPTION]: (state, data: string) => (state.exception = data),
  [vxt.UPDATE_RECORDS]: (state, data) => {
    state.reservationRecords = data;
  },
  [vxt.UPDATE_TEACHER_RECORDS]: (state, data) => {
    state.teacher.records = data;
  }
};

const myActions: ActionTree<State, State> = {
  [vxt.UPDATE_USER]: ({ commit }, data: User) => {
    setTimeout(() => commit(vxt.UPDATE_USER, data), 2000);
  },
  [vxt.UPDATE_PASSWORD]: async ({ commit }, data: User) => {
    const resp = await axios.patch<ResultVO>(
      `/teacher-api/common/password`,
      data
    );
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
  },
  // teacher
  [vxt.GET_TEACHER_RECORDS]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>(`/teacher-api/teacher/records`);
    commit(vxt.UPDATE_TEACHER_RECORDS, resp.data.data.myRecords);
  },
  [vxt.DELETE_TEACHER_RESERVE]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.delete<ResultVO>(
      `/teacher-api/teacher/record/${id}`
    );
    commit(vxt.UPDATE_TEACHER_RECORDS, resp.data.data.myRecords);
  },
  [vxt.UPDATE_TEACHER_RECORDS]: async ({ commit }, teacherRecordsReserve) => {
    console.log(teacherRecordsReserve.lid);
    let flag = 0;
    teacherRecordsReserve.week.forEach(async (element: number) => {
      const record = {
        id: null,
        lid: teacherRecordsReserve.lid,
        tid: teacherRecordsReserve.tid,
        courseName: teacherRecordsReserve.courseName,
        week: element, //周次
        day: teacherRecordsReserve.day, //星期几
        lesson: teacherRecordsReserve.lesson
      };
      const resp = await axios.post<ResultVO>(
        `/teacher-api/teacher/record`,
        record
      );
      commit(vxt.UPDATE_TEACHER_RECORDS, resp.data.data.myRecords);
      const lid = record.lid;
      const resp1 = await axios.get<ResultVO>(
        `/teacher-api/teacher/records/${lid}`
      );
      commit(vxt.UPDATE_RECORDS, resp1.data.data.records);
      if (resp.status == 200 && resp.data.code == 200) {
        flag = 1;
      }
    });
    if (flag == 0) {
      setTimeout(() => {
        open1();
      }, 1000);
    }
  },
  [vxt.UPDATE_RECORDS]: async ({ commit }, data) => {
    const lid = data;
    const resp = await axios.get<ResultVO>(
      `/teacher-api/teacher/records/${lid}`
    );
    setTimeout(() => commit(vxt.UPDATE_RECORDS, resp.data.data.records), 1000);
  },
  [vxt.UPDATE_TEACHER]: ({ commit }, data: Teacher) => {
    setTimeout(
      () =>
        commit(vxt.UPDATE_TEACHER, {
          id: data.id,
          name: data.name,
          profession: data.profession,
          courses: data.courses
        }),
      2000
    );
  },
  [vxt.UPDATE_COURSE]: async ({ commit }, data) => {
    const resp = await axios.patch<ResultVO>(
      `/teacher-api/teacher/course`,
      data
    );
    commit(vxt.UPDATE_COURSE, resp.data.data.teacher.courses);
  },
  [vxt.ADD_COURSE]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(
      `/teacher-api/teacher/course`,
      data
    );
    commit(vxt.UPDATE_COURSE, resp.data.data.teacher.courses);
  },
  [vxt.DELETE_COURSE]: async ({ commit }, data) => {
    const cid = data;
    const resp = await axios.delete<ResultVO>(
      `/teacher-api/teacher/course/${cid}`
    );
    commit(vxt.UPDATE_COURSE, resp.data.data.teacher.courses);
  },
  // admin
  [vxt.RESET_TEACHER_PASSORD]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.patch<ResultVO>(`/admin-api/admin/password/${id}`);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
  },
  [vxt.DELETE_TEACHER]: async ({ commit }, data) => {
    const tid = data;
    const resp = await axios.delete<ResultVO>(`/admin-api/admin/teacher/${tid}`);
    commit(vxt.UPDATE_TEACHERS, resp.data.data.teachers);
  },
  [vxt.UPDATE_TEACHER]: async ({ commit }, data) => {
    const resp = await axios.patch<ResultVO>(`/admin-api/admin/teacher`, data);
    commit(vxt.UPDATE_TEACHERS, resp.data.data.teachers);
  },
  [vxt.ADD_TEACHER]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/admin-api/admin/teacher`, data);
    commit(vxt.UPDATE_TEACHERS, resp.data.data.teachers);
  },
  [vxt.DELETE_LAB]: async ({ commit }, data) => {
    const lid = data;
    const resp = await axios.delete<ResultVO>(`/admin-api/admin/lab/${lid}`);
    commit(vxt.UPDATE_LABS, resp.data.data.labs);
  },
  [vxt.UPDATE_LAB]: async ({ commit }, data) => {
    const resp = await axios.patch<ResultVO>(`/admin-api/admin/lab`, data);
    commit(vxt.UPDATE_LABS, resp.data.data.labs);
  },
  [vxt.ADD_LAB]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/admin-api/admin/lab`, data);
    commit(vxt.UPDATE_LABS, resp.data.data.labs);
  },
  [vxt.UPDATE_LABS]: ({ commit }, data: Lab[]) => {
    setTimeout(() => commit(vxt.UPDATE_LABS, data), 2000);
  },
  [vxt.UPDATE_TEACHERS]: ({ commit }, data: Teacher[]) => {
    setTimeout(() => commit(vxt.UPDATE_TEACHERS, data), 2000);
  },
  [vxt.LOGIN]: async ({ commit }, data) => {
    // try可避免控制台的未捕获异常信息
    try {
      const resp = await axios.post<ResultVO>("/login-api/login", data);
      console.log(resp.data.code);
      sessionStorage.setItem("authorization", resp.headers.token);
      commit(vxt.UPDATE_USER, {
        id: resp.data.data.uid,
        role: resp.data.data.role
      });
      if (resp.data.data.role == 5) {
        const respT = await axios.get<ResultVO>(`/teacher-api/common/teacher`);
        commit(vxt.UPDATE_TEACHER, respT.data.data.teacher);
        const respTr = await axios.get<ResultVO>(
          `/teacher-api/teacher/records`
        );
        commit(vxt.UPDATE_TEACHER_RECORDS, respTr.data.data.myRecords);
        const respL = await axios.get<ResultVO>(`/teacher-api/common/labs`);
        commit(vxt.UPDATE_LABS, respL.data.data.labs);
      } else {
        const respL = await axios.get<ResultVO>(`/admin-api/common/labs`);
        commit(vxt.UPDATE_LABS, respL.data.data.labs);
        const respTS = await axios.get<ResultVO>(`/admin-api/admin/teachers`);
        commit(vxt.UPDATE_TEACHERS, respTS.data.data.teachers);
      }
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  }
};

const myGetters: GetterTree<State, State> = {};

export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters
});
