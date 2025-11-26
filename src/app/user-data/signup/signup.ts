import { Component } from '@angular/core';
import { UserServiceApiService } from '../../user-service-api-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  logindata = {
    userName: '',
    email: '',
    password: '',
  };

  selectedFile: File | null = null;

  constructor(private userService: UserServiceApiService, private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('userName', this.logindata.userName);
    formData.append('email', this.logindata.email);
    formData.append('password', this.logindata.password);

    if (this.selectedFile) {
      formData.append('userImg', this.selectedFile);   // ✔ MUST MATCH BACKEND
    }

    this.userService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('useremail', this.logindata.email);
        this.router.navigateByUrl('otp-Method');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
