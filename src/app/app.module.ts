import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentComponent } from './document/document.component';
import {SocketIoModule,SocketIoConfig} from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstNavComponent } from './first-nav/first-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { UsersComponent } from './users/users.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ImageComponent } from './image/image.component';
import {HttpClientModule} from '@angular/common/http'
import { from } from 'rxjs';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatNavComponent } from './chat-nav/chat-nav.component';
import { PnavComponent } from './pnav/pnav.component';
import { PostsComponent } from './posts/posts.component';
import { ShowComponent } from './show/show.component';
// const config : SocketIoConfig={ url:'https://angularchtat.herokuapp.com',options:{}};
const config : SocketIoConfig={ url:'http://localhost:1992',options:{}};



@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentComponent,
    FirstNavComponent,
    RegisterComponent,
    LoginComponent,
    FriendsComponent,
    UsersComponent,
    CreateGroupComponent,
    ImageComponent,
    SidenavComponent,
    ChatNavComponent,
    PnavComponent,
    PostsComponent,
    ShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
