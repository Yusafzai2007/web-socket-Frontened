import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageResponse } from '../interface/chatMessage';
import { CreateMessageResponse } from '../interface/sendMessages';

@Injectable({
  providedIn: 'root',
})
export class Messages {
  constructor(private http: HttpClient) {}

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

  sendMessages(id: string, formData: FormData) {
  return this.http.post<CreateMessageResponse>(
    `${this.privatUrl}/send-message/${id}`,
    formData,
    { withCredentials: true }
  );
}

}
