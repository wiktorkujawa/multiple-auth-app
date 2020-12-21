import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {
  @Output() addMessage: EventEmitter<any> = new EventEmitter();
  path!: string;
  content!: string;
  // in app.component.ts
  files!: File[];
  fileImage: boolean = false
  email!: string;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.path = this.data.image;
    this.email = this.data.email;
  }

  onSelect(event: any) {
    this.files=event.addedFiles;
  }

  setGoogleImage(event: any) {
    event.checked ? this.path = this.data.image : this.path ='';
  }

  onSubmit() {

    if( this.fileImage){
      const message = new FormData();
      
      console.log(this.files[0]);
      message.append('message', this.files[0]);

      console.log(typeof(JSON.stringify(this.fileImage)));
      message.append('content', this.content);
      message.append('email', this.email);
      message.append('fileImage', JSON.stringify(this.fileImage));
      this.addMessage.emit(message);
    }
    else{
      const message = {
        content: this.content,
        email: this.email,
        fileImage: this.fileImage,
        path: this.path
      }
      this.addMessage.emit(message);
    }
    
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  
  onRemove(event: any) {
    this.files=[];
  }

}