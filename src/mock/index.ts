import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
// 过滤http前缀请求
// mock.onAny(/^http/).passThrough();
// mock.onAny(/^\/api\//).passThrough();

function path(p: string) {
  const reg = p.replace(/{\w+}/g, "(\\w+)").replace(/\//g, "\\/") + "$";
  return new RegExp(reg);
}

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
// const resulVO: ResultVO = {
//   code: 200,
//   data: {}
// };

// mock.onPost("/api/login").reply(c => {
//   const data = JSON.parse(c.data);
//   const { userName, password } = data.user;
//   if (userName == "123" && password == "123") {
//     resulVO.code = 200;
//     resulVO.data = {
//       user: {
//         id: 2018214252,
//         password:
//           "$2a$10$lHT/o05.Jry5/nQTZd1kvePX3BPyYx4mIsxYXz9jJL0U2hJWlGOLe",
//         role: 5,
//         username: "TeacherTian"
//       }
//     };
//     resulVO.message = "";
//     return [
//       200,
//       resulVO,
//       {
//         token:
//           "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6"
//       }
//     ];
//   }
//   resulVO.code = 401;
//   resulVO.message = "用户名密码错误";
//   return [200, resulVO];
// });

// mock.onGet(path("/api/common/teacher")).reply(200, {
//   code: 200,
//   data: {
//     teacher: {
//       id: 2018214252,
//       name: "张三",
//       profession: "信息与计算机工程学院",
//       courses: [
//         {
//           id: 1398277502454464500,
//           tid: 2018214252,
//           name: "java程序设计",
//           classHour: 72,
//           studentNumber: 70
//         },
//         {
//           id: 1398277659162103800,
//           tid: 2018214252,
//           name: "java程序设计",
//           classHour: 72,
//           studentNumber: 60
//         },
//         {
//           id: 1398526771174338600,
//           tid: 2018214252,
//           name: "web开发设计",
//           classHour: 65,
//           studentNumber: 31
//         },
//         {
//           id: 139852677117433860,
//           tid: 2018214252,
//           name: "web框架设计",
//           classHour: 65,
//           studentNumber: 31
//         },
//         {
//           id: 1398526771174338600,
//           tid: 2018214252,
//           name: "docker部署",
//           classHour: 65,
//           studentNumber: 31
//         }
//       ]
//     }
//   }
// } as ResultVO);
