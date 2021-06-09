<template>
  <div id="teacherContainer">
    <div class="common-layout">
      <el-container>
        <div id="theader">
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
              to="/manager/laboratoryM"
              style="color:white;  text-decoration: none;"
            >
              实验室管理
            </router-link>
            -
            <router-link
              to="/manager/teacherM"
              style="color:white;text-decoration: none;"
            >
              教师管理
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
