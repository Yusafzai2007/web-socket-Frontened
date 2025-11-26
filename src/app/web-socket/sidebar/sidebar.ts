import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { User, UserResponse } from '../../interface/user';
import { HttpClient } from '@angular/common/http';
import { UserServiceApiService } from '../../user-service-api-service';
import { currentUser, SingleUserResponse } from '../../interface/curr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  isSidebarOpen: boolean = true;

  currentUserData: currentUser | null = null;

  userdata: User[] = [];

  ngOnInit(): void {
    this.users();
    this.fetchCurrentUser()
  }

  constructor(private dep: UserServiceApiService,private router:Router) {}
  users() {
    this.dep.users().subscribe((res: UserResponse) => {
      this.userdata = res.message;
      
    });
  }
  
  fetchCurrentUser() {
    this.dep.currentuser().subscribe((res: SingleUserResponse) => {
      this.currentUserData = res.tourism
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

 goToUser(user: any) {
  console.log('Clicked user:', user.userName);
  
  this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Force reload
  this.router.onSameUrlNavigation = 'reload'; // Needed for same route
  this.router.navigate([`/admin/chatting/${user._id}`]);
}


  logout(){
    this.dep.logoutuser().subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigateByUrl('')
      }
    })
  }
}
