<template>
  <el-drawer
    v-model="drawer"
    :direction="direction"
    :before-close="handleClose"
    destroy-on-close
  >
    <p style="font-size:30px">预约教室使用说明</p>
    <p style="font-size:20px">
      1、需提前1天登陆系统预约，当天预约的，须及时通知教室管理员。
    </p>
    <p style="font-size:20px">
      2、教师根据自己的实验课程，点击预约按钮进行预约。
    </p>
    <p style="font-size:20px">
      3、先选定要使用的教室；再选定星期和节次的位置处，单击“预约”。
    </p>
    <p style="font-size:20px">
      4、选定周次，确定预约。
    </p>
  </el-drawer>
  <div id="teacherContainer">
    <div class="common-layout">
      <el-container>
        <div id="theader">
          <el-button
            @click="drawer = true"
            type="success"
            style="margin: 60px;"
            icon="el-icon-question"
            circle
          ></el-button>
          <el-header><p>实验室预约系统</p></el-header>
        </div>
        <div
          id="back"
          style="display:flex;  justify-content:center;background-color:green;padding:10px;color:white"
        >
          <div>
            <router-link
              to="/login"
              style="color:white;  text-decoration: none;"
            >
              退出
            </router-link>
            -
            <router-link
              to="/homepage"
              style="color:white;text-decoration: none;"
            >
              首页
            </router-link>
          </div>
        </div>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "ltr"
    };
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#teacherContainer {
  background-image: url(./../assets/4.jpg);
  position: fixed;
  background-position: center;
  background-repeat: repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#teacherContainer .el-container {
  width: 70vw;
  height: 100vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
#teacherContainer .el-header {
  color: green;
  font-family: Fantasy;
  font-size: 50px;
}
.el-main {
  background-image: url(./../assets/background.jpg);
  color: #333;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#theader {
  height: 19vh;
  background-image: url(./../assets/header.jpg);
  background-size: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-drawer p {
  margin: 20px;
}
</style>
