import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceApiService } from '../../user-service-api-service';

@Component({
  selector: 'app-otp-method',
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-method.html',
  styleUrl: './otp-method.css',
})
export class OtpMethod {

 otpMethod = {
    email: '',
    otp: '',
  };

  constructor(private dep: UserServiceApiService, private route: Router) {}

  ngOnInit() {
    const storedEmail = localStorage.getItem('useremail');
    if (storedEmail) {
      this.otpMethod.email = storedEmail;
      console.log('Email fetched from localStorage:', storedEmail);
    } else {
      console.log('No email found in localStorage');
    }
  }

  verifyOtp() {
    if (this.otpMethod.otp.length !== 6) {
      alert('Please enter a 6-digit OTP');
      return;
    }

    this.dep.OTP(this.otpMethod).subscribe({
      next: (res) => {
        console.log('OTP Verified Successfully:', res);
        alert('OTP Verified Successfully!');
        this.route.navigateByUrl('');
      },
      error: (err) => {
        console.error('OTP Verification Failed:', err);
        alert('Invalid OTP, please try again.');
      },
    });
  }
}
