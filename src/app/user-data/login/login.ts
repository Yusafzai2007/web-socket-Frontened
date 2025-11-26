import { Component } from '@angular/core';
import { UserServiceApiService } from '../../user-service-api-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  logindata = {
    email: 'zai300354@gmail.com',
    password: '123',
  };

  constructor(private dep: UserServiceApiService, private router: Router) {}
  socket: any;

  submit() {
    this.dep.login(this.logindata).subscribe({
      next: (res: any) => {
        const userId = res.id;

        const socket: Socket = io('http://localhost:4000', {
          query: { userId },
          transports: ['websocket'],
        });
        socket.on('onlineuser', (onlineuser: String[]) => {
          console.log('online', onlineuser);
        });

        console.log(res);
        this.router.navigateByUrl('admin/static');
      },
      error: (err) => console.log(err),
    });
  }
}
