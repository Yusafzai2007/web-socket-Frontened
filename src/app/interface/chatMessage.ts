export interface MessageResponse {
  statuscode: number;
  tourism: string;
  message: ChatMessage[];
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  userImg: string;
  createat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
