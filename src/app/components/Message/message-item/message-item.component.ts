import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  @Input() message: any;
  @Input() user: any;
  @Output() deleteMessage : EventEmitter<any> = new EventEmitter();
  @Output() openUpdateDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor() {}

  
  ngOnInit(): void {
  }
  

  onUpdate(_id: string) {
    this.openUpdateDialog.emit(_id);
  }
  onDelete(_id: string) {
    this.deleteMessage.emit(_id);
  }

}
