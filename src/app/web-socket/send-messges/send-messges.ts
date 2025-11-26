import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../chat-messgaes/messages';
import { createMessage } from '../../interface/sendMessages';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-messges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-messges.html',
  styleUrl: './send-messges.css',
})
export class SendMessges implements OnInit {
  sending: createMessage = {
    senderId: '',
    receiverId: '',
    message: '',
    userImg: ''
  };

  selectedImage: File | null = null;
  productId: string | null = null;

  // ✅ loader state
  isSending: boolean = false;

  constructor(private active: ActivatedRoute, private message: Messages) {}

  ngOnInit(): void {
    this.productId = this.active.snapshot.paramMap.get('id');
    if (this.productId) {
      this.sending.receiverId = this.productId;
    }
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
    this.sending.userImg = this.selectedImage?.name || '';
  }

  removeImage() {
    this.selectedImage = null;
    this.sending.userImg = '';
  }

  sendMessage() {
    if (!this.productId) return;

    const formData = new FormData();
    formData.append('senderId', this.sending.senderId);
    formData.append('receiverId', this.sending.receiverId);
    formData.append('message', this.sending.message);
    if (this.selectedImage) formData.append('userImg', this.selectedImage);

    // ✅ Show loader
    this.isSending = true;

    this.message.sendMessages(this.productId, formData).subscribe({
      next: (res) => {
        console.log("Sent:", res);

        // reset message box
        this.sending.message = "";
        this.removeImage();
        this.isSending = false; // hide loader
      },
      error: (err) => {
        console.error("Send failed:", err);
        this.isSending = false; // hide loader even on error
      }
    });
  }
}
