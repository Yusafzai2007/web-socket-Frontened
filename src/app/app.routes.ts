import { Routes } from '@angular/router';
import { Signup } from './user-data/signup/signup';
import { OtpMethod } from './user-data/otp-method/otp-method';
import { Login } from './user-data/login/login';
import { Sidebar } from './web-socket/sidebar/sidebar';
import { StaticPage } from './web-socket/static-page/static-page';
import { ChatsMessaging } from './web-socket/chats-messaging/chats-messaging';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'otp-Method',
    component: OtpMethod,
  },
  {
    path: 'sidebar',
    component: Sidebar,
  },
  {
    path: 'admin',
    component: Sidebar,
    children: [
      {
        path: 'static',
        component: StaticPage,
      },
      {
        path: 'chatting/:id',
        component: ChatsMessaging, 
      },
    
    ],
  },
];
