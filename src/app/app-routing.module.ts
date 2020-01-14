import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ImageComponent } from './image/image.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatNavComponent } from './chat-nav/chat-nav.component';


const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'profile',component:ImageComponent},
  {path:'chat',component:ChatComponent},
  {path:'login',component:LoginComponent},
  {path:"friend",component:ChatNavComponent},
  {path:'register',component:RegisterComponent},
  {path:"document",component:DocumentComponent,children:[
    {path:"posts",component:SidenavComponent}, 
    {path:"document-list",component:DocumentListComponent},
    {path:'friends',component:FriendsComponent},
    {path:"users",component:UsersComponent},
    {path:'group',component:CreateGroupComponent},
  ]},
  // {path:'document',component:SidenavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
