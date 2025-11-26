interface UserMessage {
  _id: string;
  userName: string;
  email: string;
  userImg: string;
  bio: string;
  role: string;
  isOnline: boolean;  // <-- change from string to boolean
  emailotp: string;
  expireotp: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface NavBarDataResponse {
  statuscode: number;
  tourism: string;
  message: UserMessage;
}
