// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: Socket;

  connect(userId: string) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('http://localhost:4000', {
        query: { userId },
        transports: ['websocket'],
      });
    }
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  onOnlineUsers(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('onlineuser', (users: string[]) => observer.next(users));
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}
