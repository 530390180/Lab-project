<template>
  <div id="loginContainer">
    <div style="display:flex;align-items: center;justify-content: center;">
      <img src="./../assets/logo.png" alt="" />
    </div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <p style="font-family:KaiTi;font-size:25px">
            ——信息学院实验室管理系统——
          </p>
        </el-header>
        <el-main>
          <el-form
            ref="numberValidateForm"
            class="demo-ruleForm"
            label-width="100px"
            :label-position="left"
            :model="userForm"
          >
            <el-form-item
              :rules="[{ required: true, message: '用户名不能为空' }]"
              prop="userName"
              label="用户名"
              style="margin: 20px;"
            >
              <el-input
                class="login-el-input"
                v-model="userForm.userName"
                placeholder="请输入用户名"
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
                class="login-el-input"
                v-model="userForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <div class="login-button">
              <el-button @click="login" type="primary" round>登录</el-button>
            </div>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts">
import { UserForm } from "@/datasource/Types";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { State } from "@/store";
import { LOGIN } from "@/store/VuexTypes";
import { useRouter } from "vue-router";
function useLogin(userForm: Ref<UserForm>, store: Store<State>) {
  const login = (): void => {
    const user = {
      userName: userForm.value.userName,
      password: userForm.value.password
    };
    store.dispatch(LOGIN, user);
  };
  return {
    login
  };
}
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const userForm = ref<UserForm>({ userName: "", password: "" });
    const { login } = useLogin(userForm, store);
    const userRef = computed(() => store.state.user);
    const router = useRouter();
    watch(userRef, () => {
      if (userRef.value.role == 5) {
        const toTeacher = () => {
          router.push("/homepage");
        };
        setTimeout(() => toTeacher(), 500);
      } else {
        const toManager = () => {
          router.push("/manager");
          console.log("route");
        };
        setTimeout(() => toManager(), 500);
      }
    });
    return {
      userForm,
      login
    };
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 登录-start */
#loginContainer {
  padding: 3px;
  position: fixed;
  background-image: url(./../assets/背景.jpg);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#loginContainer .common-layout {
  text-align: center;
  width: 480px;
  border: 3px solid black;
  border-radius: 5px;
}
#loginContainer .el-header {
  background-color: aliceblue;
  color: #333;
  text-align: center;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#loginContainer .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#loginContainer .el-main .login-el-input {
  margin: 10px;
  width: 300px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#loginContainer .el-dropdown .el-button {
  padding: 10px;
}
#loginContainer .el-dropdown-menu {
  width: 200px;
}
#loginContainer .el-dropdown-item {
  display: block;
}
#loginContainer .el-select {
  width: 105px;
}
#loginContainer .el-button {
  margin-left: 20px;
}
#loginContainer .el-select {
  margin-right: 20px;
}
#loginContainer .login-button {
  margin-top: 10px;
}

/* 登录-end */
</style>
