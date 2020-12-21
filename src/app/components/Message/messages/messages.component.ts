import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMessageComponent } from '../add-message/add-message.component';
import { UpdateMessageComponent } from '../update-message/update-message.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() user: any;
  messages: any;

  // onOutletLoaded(event : any) {
  //   console.log(event);
  // }
  cols! : number;
  margin!: string;
  gutter!: string;
  environment: string = environment.apiUrl;

  getTileColor(message: any): any {
    if(message.email=="wiktorkujawa1993@gmail.com"){
      return '#42A5F5'
    }
    else{ 
      if(this.user){

        if(this.user.email===message.email){
          return '#66BB6A'
        }
        else return '#9E9E9E'

      }
      else return '#9E9E9E'
    }
  }

  Breakpoint = {
    grid:{
      xl: 5,
      lg: 4,
      md: 3,
      sm: 2,
      xs: 1
    },
    margin:{
      xl: "2rem",
      lg: "1.7rem",
      md: "1.4rem",
      sm: "1.1rem",
      xs: "0.8rem"
    },
    gutter:{
      xl: "50px",
      lg: "40px",
      md: "30px",
      sm: "20px",
      xs: "10px"
    }
  }

  constructor(private messageService: MessageService,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {
                this.breakpointObserver.observe([
                  Breakpoints.XSmall,
                  Breakpoints.Small,
                  Breakpoints.Medium,
                  Breakpoints.Large,
                  Breakpoints.XLarge,
                ]).subscribe(result => {
                  if (result.matches) {
                    if (result.breakpoints[Breakpoints.XSmall]) {
                      this.cols = this.Breakpoint.grid.xs;
                      this.margin = this.Breakpoint.margin.xs;
                      this.gutter = this.Breakpoint.gutter.xs;
                    }
                    if (result.breakpoints[Breakpoints.Small]) {
                      this.cols = this.Breakpoint.grid.sm;
                      this.margin = this.Breakpoint.margin.sm;
                      this.gutter = this.Breakpoint.gutter.sm;
                    }
                    if (result.breakpoints[Breakpoints.Medium]) {
                      this.cols = this.Breakpoint.grid.md;
                      this.margin = this.Breakpoint.margin.md;
                      this.gutter = this.Breakpoint.gutter.md;
                    }
                    if (result.breakpoints[Breakpoints.Large]) {
                      this.cols = this.Breakpoint.grid.lg;
                      this.margin = this.Breakpoint.margin.lg;
                      this.gutter = this.Breakpoint.gutter.lg;
                    }
                    if (result.breakpoints[Breakpoints.XLarge]) {
                      this.cols = this.Breakpoint.grid.xl;
                      this.margin = this.Breakpoint.margin.xl;
                      this.gutter = this.Breakpoint.gutter.xl;
                    }
                  }
                });
              }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe( messages => {
      this.messages = messages;
    })
  }


  openDialog(){
    const ref = this.dialog.open(AddMessageComponent, { width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', 
    data: this.user
    });
    const sub = ref.componentInstance.addMessage.subscribe((message: any) => {
      this.messageService.addMessage(message).subscribe( message => this.messages.push(message));
    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
  
  openUpdateDialog(id:any){
    const ref = this.dialog.open(UpdateMessageComponent, { width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', data: {
      message: this.messages.filter( (message:any) => id === message._id ),
      user: this.user
    }});
    const sub = ref.componentInstance.updateMessage.subscribe((message: any) => {
      const index = this.messages.findIndex((message: any) => message._id === id);
      this.messageService.updateMessage(id,message).subscribe( message => this.messages[index] = message);
    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }


  deleteMessage(id:any) {
    // Remove from UI
    this.messages = this.messages.filter( (t: any) => t._id !== id );
    // Remove from server
    this.messageService.deleteMessage(id).subscribe();
  }
  
  
}
