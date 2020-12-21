import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageUrl:string = 'api/messages';
  constructor(private webService: WebService) { }

  getMessages(){
    return this.webService.get(this.messageUrl);
  }

  addMessage(message:any){
    return this.webService.post(this.messageUrl, message);
  }

  deleteMessage(id:string){
    return this.webService.delete(this.messageUrl, id );
  }

  updateMessage(id: string,message: any){
    return this.webService.put(this.messageUrl, id, message);
  }
}
