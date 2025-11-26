export interface User {
  _id: string;
  userName: string;
  email: string;
  userImg: string;
  bio: string | null;
  role: string;
  emailotp: string | null;
  expireotp: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserResponse {
  statuscode: number;
  tourism: string;
  message: User[];
}
