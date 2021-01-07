import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicComponent } from './components/public/public.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { AddMessageComponent } from './components/Message/add-message/add-message.component';
import { MessagesComponent } from './components/Message/messages/messages.component';
import { MessageItemComponent } from './components/Message/message-item/message-item.component';
import { UpdateMessageComponent } from './components/Message/update-message/update-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AuthComponent } from './components/Auth/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    AboutComponent,
    AddMessageComponent,
    MessagesComponent,
    MessageItemComponent,
    UpdateMessageComponent,
    AuthComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxDropzoneModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
