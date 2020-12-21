import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrls: ['./update-message.component.scss']
})
export class UpdateMessageComponent implements OnInit {
  path!: string;
  content!: string;
  environment: string = environment.apiUrl;
  image!: string;
  // in app.component.ts
  id: any;
  files!: File[];
  fileImage!: boolean
  @Output() updateMessage: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.path=this.data.message[0].path
    this.content=this.data.message[0].content
    this.fileImage=this.data.message[0].fileImage
    this.id=this.data.message[0]._id
    this.image=this.data.user.image;
  }

  setGoogleImage(event: any) {
    event.checked ? this.path = this.data.user.image : this.path ='';
  }

  onSelect(event: any) {
    this.files=event.addedFiles;
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  
  onRemove(event: any) {
    this.files=[];
  }

  onSubmit() {

    if( this.fileImage && this.files){
      const message = new FormData();
      
      console.log(this.files[0]);
      message.append('message', this.files[0]);

      console.log(typeof(JSON.stringify(this.fileImage)));
      message.append('content', this.content);
      message.append('fileImage', JSON.stringify(this.fileImage));
      this.updateMessage.emit(message);
    }
    else{
      const message = {
        content: this.content,
        fileImage: this.fileImage,
        path: this.path
      }
      this.updateMessage.emit(message);
    }
    
  }

}
