export interface currentUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userImg: string;
  bio: string | null;
  role: string;
  emailotp: string | null;
  expireotp: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SingleUserResponse {
  statuscode: number;
  tourism: currentUser;
  message: string;
}
