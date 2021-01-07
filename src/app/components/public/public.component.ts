import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AuthComponent } from '../Auth/auth/auth.component';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  mediaSub!: Subscription;
  opened: boolean=false;
  user: any;
  mobile!: boolean;
  environment: string = environment.apiUrl;
 
  msg:any;
  register: any

  constructor(public dialog: MatDialog,
    public _router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) {
          result.breakpoints[Breakpoints.XSmall] ?
            this.mobile = true :
            this.mobile = false;
          
        }
      });
    }

    logStatus(data:any){
      this.user = data.user;
    }

    Logout(){
      this.authService.logout()
      .subscribe(
        (data:any)=>{
          this.user=undefined;
          this.msg = 'Logout success'
          this._router.navigate(['/'])
          .then(() => this.msg = data.message);
          
        },
        error => console.error(error)
      )
    }

    onActivate(component: any) {
      this.msg = null;
      this.authService.getUser()
      .subscribe(
        (data:any) => {
  
          this.logStatus(data);
          this.user = data;
          component.user = this.user;
        }
        ,
        error => component.msg = error.error.message
        );
  
      }


    onSwitchTheme(event:any){
      event.checked ? this.document.body.classList.add('alternate-theme'): this.document.body.classList.remove('alternate-theme') 
    }


  ngOnInit(): void {
    console.log(this.user);
  }

  openDialog(register: boolean){
    const ref = this.dialog.open(AuthComponent, { 
      panelClass: 'my-dialog',
      closeOnNavigation: true, 
      data: {
        environment: this.environment,
        mobile: this.mobile,
        register: register
      }
    });

    const sub = ref.componentInstance.LoginOrRegister.subscribe((data:any) => {
      data.register ?
        this.authService.register(JSON.stringify(data.userData))
        .subscribe(
          (data:any) => {
            ref.componentInstance.data.msg = data.message
          } ,
          error =>  ref.componentInstance.data.msg = error.error[0].message
        ) :
        this.authService.login(JSON.stringify(data.userData))
        .subscribe(
          (data: any) => {
            this.msg = data.message;
            this.authService.getUser().subscribe(
            (data:any) => {
              this.logStatus(data);
              this.user = data;
              this.dialog.closeAll();
            }
        );
          } ,
          error =>  ref.componentInstance.data.msg = error.error.message
        )
    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}