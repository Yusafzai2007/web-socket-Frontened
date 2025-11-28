import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageResponse } from '../interface/chatMessage';
import { CreateMessageResponse } from '../interface/sendMessages';
import { io, Socket } from 'socket.io-client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Messages {
  private socket!: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4000', {
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  privatUrl = 'http://localhost:4000/api/v1/socket';

  navbarmessages(id: string) {
    return this.http.get<NavBarDataResponse>(`${this.privatUrl}/navbar-messges/${id}`, {
      withCredentials: true,
    });
  }

  chatmessages(id: string) {
    return this.http.get<MessageResponse>(`${this.privatUrl}/get-messges/${id}`, {
      withCredentials: true,
    });
  }

  // ✅ FINAL WORKING SEND FUNCTION
  sendMessages(id: string, formData: FormData) {
    return this.http
      .post<CreateMessageResponse>(
        `${this.privatUrl}/send-message/${id}`,
        formData,
        { withCredentials: true }
      )
      .pipe(
        tap((res: any) => {
          if (res?.data) {
            // 🔥 send message to socket server
            this.socket.emit('message', res.data);
          }
        })
      );
  }

  // Listen for real-time messages
  listenForMessages(callback: (msg: any) => void) {
    this.socket.on('message', callback);
  }
}
