export interface createMessage {
  senderId: string;
  receiverId: string;
  message: string;
  userImg?: string;
 
}



export interface CreateMessageResponse {
  statuscode: number;
  tourism: string;
  message: createMessage;
}

