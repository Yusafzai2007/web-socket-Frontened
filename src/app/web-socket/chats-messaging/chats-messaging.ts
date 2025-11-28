import { Component, OnInit } from '@angular/core';
import { currentUser, SingleUserResponse } from '../../interface/curr';
import { UserServiceApiService } from '../../user-service-api-service';
import { CommonModule } from '@angular/common';
import { SendMessges } from '../send-messges/send-messges';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../chat-messgaes/messages';
import { ChatMessage, MessageResponse } from '../../interface/chatMessage';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chats-messaging',
  imports: [CommonModule, SendMessges, FormsModule],
  templateUrl: './chats-messaging.html',
  styleUrl: './chats-messaging.css',
})
export class ChatsMessaging implements OnInit {
  messageresponse: ChatMessage[] = [];
  currentUserData: currentUser | null = null;
  navbarmessage: UserMessage | null = null;

  socket!: Socket;

  constructor(
    private dep: UserServiceApiService,
    private active: ActivatedRoute,
    private message: Messages
  ) {}

  ngOnInit(): void {
    this.fetchCurrentUser().then(() => {
      const productId = this.active.snapshot.paramMap.get('id');

      if (productId) {
        this.message.navbarmessages(productId).subscribe((res: NavBarDataResponse) => {
          this.navbarmessage = res.message;

          if (this.currentUserData) this.initSocket(this.currentUserData._id);
        });

        this.message.chatmessages(productId).subscribe((res: MessageResponse) => {
          this.messageresponse = res.message;
        });
      }

      // 🔥 Listen for messages from service
      this.message.listenForMessages((msg) => {
        this.handleIncomingMessage(msg);
      });
    });
  }

  handleIncomingMessage(msg: ChatMessage) {
    // add message directly to UI
    this.messageresponse.push(msg);

    setTimeout(() => {
      const container = document.getElementById('chatContainer');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }

  fetchCurrentUser(): Promise<void> {
    return new Promise((resolve) => {
      this.dep.currentuser().subscribe((res: SingleUserResponse) => {
        this.currentUserData = res.tourism;
        resolve();
      });
    });
  }

  initSocket(userId: string) {
    this.socket = io('http://localhost:4000', {
      query: { userId },
      transports: ['websocket'],
    });

    this.socket.on('onlineuser', (onlineUsers: string[]) => {
      if (this.navbarmessage) {
        this.navbarmessage.isOnline = onlineUsers.includes(this.navbarmessage._id);
      }
    });

    this.socket.on('message', (msg: ChatMessage) => {
      this.handleIncomingMessage(msg);
    });

    window.addEventListener('beforeunload', () => {
      this.socket.disconnect();
    });
  }
}
