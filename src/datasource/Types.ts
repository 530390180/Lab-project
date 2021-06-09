export interface UserForm {
  userName?: string;
  password?: string;
}

export interface User {
  id?: string;
  role?: number;
  userName?: string;
  password?: string;
}

export interface Teacher {
  id?: string;
  name?: string;
  profession?: string;
  courses?: [];
  records?: [];
}

export interface Course {
  id?: string;
  tid?: number;
  name?: string;
  classHour?: number;
  studentNumber?: number;
}

export interface Lab {
  id?: string;
  machineNumber?: number;
  details?: string;
}

export interface ReservationRecord {
  id?: string;
  lid?: string;
  tid?: string;
  courseName?: string;
  week?: number; //周次
  day?: number; //星期几
  lesson?: number; //第几节课
}
